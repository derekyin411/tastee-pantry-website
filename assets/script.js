const SITE_EMAIL = 'tasteepantrynz@hotmail.com'; // Update this if Tastee Pantry changes its order/enquiry email address.

const grids = [
  { id: 'cake-grid', select: 'cake-style-select' },
  { id: 'bakery-grid' },
  { id: 'catering-grid', select: 'catering-select' },
  { id: 'gift-grid' }
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

function formToMailto(form) {
  const type = form.dataset.formType || 'Website enquiry';
  const lines = Array.from(new FormData(form).entries()).map(([key, value]) => `${key}: ${value || 'Not provided'}`);
  const subject = encodeURIComponent(`Tastee Pantry - ${type}`);
  const body = encodeURIComponent(`${type}\n\n${lines.join('\n')}\n\nSubmitted from the Tastee Pantry website.`);
  window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
}

function setupForms() {
  document.querySelectorAll('.enquiry-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      formToMailto(form);
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
