const PLACEHOLDER_FORMSPREE_ACTION = 'https://formspree.io/f/YOUR_FORM_ID';

const grids = [
  { id: 'cake-grid', select: 'cake-style-select' },
  { id: 'bakery-grid' }
];

function imageOrPlaceholder(item) {
  if (item.image) return `<img src="${item.image}" alt="${item.name}">`;
  return `<span>${item.category || 'Tastee Pantry'}<br>${item.name}</span>`;
}

function card(item) {
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

async function loadCards() {
  await Promise.all(grids.map(async ({ id, select }) => {
    const grid = document.getElementById(id);
    if (!grid) return;
    try {
      const response = await fetch(grid.dataset.source);
      const items = await response.json();
      grid.innerHTML = items.map(card).join('');
      if (select) {
        const selectNode = document.getElementById(select);
        items.forEach(item => selectNode?.insertAdjacentHTML('beforeend', `<option>${item.name}</option>`));
      }
    } catch (error) {
      grid.innerHTML = '<p>Products are temporarily unavailable. Please email Tastee Pantry for current options.</p>';
      console.error(`Could not load ${grid.dataset.source}`, error);
    }
  }));
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
    setMinimumCakeDate();
    setFormStatus(form, `Thank you — your ${type.toLowerCase()} has been sent. We will contact you to confirm the details.`, 'success');
  } catch (error) {
    console.error(`Could not submit ${type}`, error);
    setFormStatus(form, 'Sorry, something went wrong. Please check your details and try again, or contact Tastee Pantry directly.', 'error');
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

document.getElementById('year').textContent = new Date().getFullYear();
setMinimumCakeDate();
setupNavigation();
setupForms();
loadCards();
