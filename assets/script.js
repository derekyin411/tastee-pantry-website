const PLACEHOLDER_FORMSPREE_ACTION = 'https://formspree.io/f/YOUR_FORM_ID';

const grids = [
  { id: 'cake-grid', select: 'cake-style-select' },
  { id: 'bakery-grid' }
];

let cakeItems = [];
let selectedCake = null;

function formatPrice(value) {
  if (typeof value !== 'number') return '—';
  return `$${value.toFixed(2)}`;
}

function imageOrPlaceholder(item) {
  if (item.image) return `<img src="${item.image}" alt="${item.name}">`;
  return `<span>${item.category || 'DEVARO'}<br>${item.name}</span>`;
}

function lowestPrice(item) {
  const prices = Object.values(item.prices || {}).filter(value => typeof value === 'number');
  return prices.length ? Math.min(...prices) : null;
}

function card(item, index) {
  if (item.prices) {
    const from = lowestPrice(item);
    return `<article class="product-card cake-product-card" data-cake-index="${index}" data-category="${item.category}">
      <button type="button" class="cake-select-card" aria-label="Select ${item.name}">
        <div class="product-image">${imageOrPlaceholder(item)}</div>
        <div class="product-body">
          <span class="tag">${item.category}</span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <strong class="cake-from-price">From ${formatPrice(from)}</strong>
          <span class="button secondary">Order this cake</span>
        </div>
      </button>
    </article>`;
  }

  const action = item.enquiryLabel ? `<a class="button secondary" href="#contact">${item.enquiryLabel}</a>` : '';
  return `<article class="product-card">
    <div class="product-image">${imageOrPlaceholder(item)}</div>
    <div class="product-body">
      <span class="tag">${item.category}</span>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      ${action}
    </div>
  </article>`;
}

function renderCakeCards(items) {
  const grid = document.getElementById('cake-grid');
  if (!grid) return;
  grid.innerHTML = items.map((item, index) => card(item, index)).join('');
}

function setSelectedCake(item) {
  selectedCake = item;
  const name = document.getElementById('selected-cake-name');
  const description = document.getElementById('selected-cake-description');
  const image = document.getElementById('selected-cake-image');
  const styleSelect = document.getElementById('cake-style-select');
  const hiddenCake = document.getElementById('selected-cake-hidden');

  if (name) name.textContent = item.name;
  if (description) description.textContent = item.description;
  if (image) image.innerHTML = imageOrPlaceholder(item);
  if (styleSelect) styleSelect.value = item.name;
  if (hiddenCake) hiddenCake.value = item.name;

  updateCakePrice();
}

function updateCakePrice() {
  const priceNode = document.getElementById('selected-cake-price');
  const hiddenPrice = document.getElementById('estimated-price-hidden');
  const sizeSelect = document.getElementById('cake-size-select');
  const size = sizeSelect?.value;
  const price = selectedCake?.prices?.[size];
  const display = price ? formatPrice(price) : selectedCake ? `From ${formatPrice(lowestPrice(selectedCake))}` : '—';

  if (priceNode) priceNode.textContent = display;
  if (hiddenPrice) hiddenPrice.value = price ? display : '';
}

function setupCakeOrdering() {
  const cakeGrid = document.getElementById('cake-grid');
  const styleSelect = document.getElementById('cake-style-select');
  const sizeSelect = document.getElementById('cake-size-select');
  const filterButtons = document.querySelectorAll('.cake-category-pills button');

  cakeGrid?.addEventListener('click', event => {
    const cardNode = event.target.closest('[data-cake-index]');
    if (!cardNode) return;
    const index = Number(cardNode.dataset.cakeIndex);
    const item = cakeItems[index];
    if (!item) return;
    setSelectedCake(item);
    document.getElementById('cake-order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  styleSelect?.addEventListener('change', () => {
    const item = cakeItems.find(cake => cake.name === styleSelect.value);
    if (item) setSelectedCake(item);
  });

  sizeSelect?.addEventListener('change', updateCakePrice);

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(node => node.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.cake-product-card').forEach(cardNode => {
        const show = filter === 'all' || cardNode.dataset.category === filter;
        cardNode.style.display = show ? '' : 'none';
      });
    });
  });
}

async function loadCards() {
  await Promise.all(grids.map(async ({ id, select }) => {
    const grid = document.getElementById(id);
    if (!grid) return;
    try {
      const response = await fetch(grid.dataset.source);
      const items = await response.json();
      if (id === 'cake-grid') {
        cakeItems = items;
        renderCakeCards(items);
      } else {
        grid.innerHTML = items.map(card).join('');
      }
      if (select) {
        const selectNode = document.getElementById(select);
        items.forEach(item => selectNode?.insertAdjacentHTML('beforeend', `<option>${item.name}</option>`));
      }
    } catch (error) {
      grid.innerHTML = '<p>Products are temporarily unavailable. Please email DEVARO for current options.</p>';
      console.error(`Could not load ${grid.dataset.source}`, error);
    }
  }));
  setupCakeOrdering();
}

function setMinimumCakeDate() {
  document.querySelectorAll('input[data-min-days]').forEach(input => {
    const days = Number(input.dataset.minDays || 0);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + days);
    input.min = minDate.toISOString().split('T')[0];
  });
}

function setFormStatus(form, message, status) {
  const statusNode = form.querySelector('.form-status');
  if (!statusNode) return;
  statusNode.textContent = message;
  statusNode.classList.remove('success', 'error');
  if (status) statusNode.classList.add(status);
}

async function submitFormspreeForm(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton?.textContent;
  const type = form.dataset.formType || 'Website enquiry';

  setFormStatus(form, '', '');

  if (form.getAttribute('action') === PLACEHOLDER_FORMSPREE_ACTION) {
    setFormStatus(form, 'This form is not ready yet. Please replace the placeholder Formspree endpoint before publishing.', 'error');
    return;
  }

  submitButton?.setAttribute('disabled', '');
  if (submitButton) submitButton.textContent = 'Sending...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error(`Formspree returned ${response.status}`);

    form.reset();
    selectedCake = null;
    updateCakePrice();
    setMinimumCakeDate();
    setFormStatus(form, `Thank you — your ${type.toLowerCase()} has been sent. We will contact you to confirm the details.`, 'success');
  } catch (error) {
    console.error(`Could not submit ${type}`, error);
    setFormStatus(form, 'Sorry, something went wrong. Please check your details and try again, or contact DEVARO directly.', 'error');
  } finally {
    submitButton?.removeAttribute('disabled');
    if (submitButton && originalButtonText) submitButton.textContent = originalButtonText;
  }
}

function setupForms() {
  document.querySelectorAll('.enquiry-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      submitFormspreeForm(form);
    });
  });
}

function setupNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  links?.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      links.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();
setMinimumCakeDate();
setupNavigation();
setupForms();
loadCards();
