# Tastee Pantry Website

A clean static MVP website for Tastee Pantry, an Auckland cakery and bakery. The site now focuses on two customer-facing sections only: Cakery and Bakery.

## Current website structure

- Home
- Cakery
- Bakery
- Contact

Removed from this version:

- Catering
- Festival Gift Boxes
- Wholesale / Corporate Enquiries
- Corporate gifting wording
- B2B / wholesale wording

## How to preview the site

Because the website loads product data from JSON files, preview it with a small local web server instead of opening `index.html` directly.

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Folder structure

```text
assets/
  images/
    cakes/
    bakery/
  script.js
  styles.css
data/
  cakes.json
  bakery.json
index.html
```

## How to replace images

1. Add the new image file to the relevant folder:
   - Cakes: `assets/images/cakes/`
   - Bakery products: `assets/images/bakery/`
2. Use web-friendly image names with lowercase letters and hyphens, for example `chocolate-birthday-cake.jpg` or `custard-bun.jpg`.
3. Open the matching JSON file in `data/`.
4. Update the `image` value to the new file path, for example:

```json
"image": "assets/images/cakes/chocolate-birthday-cake.jpg"
```

If an image is missing or the path is not available yet, the website still displays a branded placeholder panel.

## How to edit cake styles

Cake product cards are controlled by:

```text
data/cakes.json
```

Each cake object uses this structure:

```json
{
  "name": "Classic Fresh Cream Cake",
  "category": "Birthday cake",
  "description": "A light celebration cake style suitable for birthdays, family gatherings and simple personalised messages.",
  "image": "assets/images/cakes/classic-fresh-cream-cake.jpg"
}
```

The cake names are also loaded into the cake order form dropdown.

## How to edit bakery products

Bakery product cards are controlled by:

```text
data/bakery.json
```

Example bakery product:

```json
{
  "name": "Custard Bun",
  "category": "Sweet buns",
  "description": "Soft sweet bun with custard filling for everyday bakery customers.",
  "image": "assets/images/bakery/custard-bun.jpg"
}
```

## How to connect the cake order form

The website stays fully static. The cake order form submits to a Formspree endpoint with a `POST` request, so no custom backend or `mailto:` order submission is required.

There is one placeholder form action in `index.html`:

```text
https://formspree.io/f/YOUR_FORM_ID
```

Replace this placeholder with the correct Formspree endpoint before publishing the form.

### Step-by-step Formspree setup

1. Sign in to Formspree or create an account at <https://formspree.io/>.
2. Create a new form for cake orders.
3. Copy the endpoint URL Formspree provides. It normally looks like `https://formspree.io/f/abcdwxyz`.
4. Open `index.html` and find the cake order form near `id="cake-order"`.
5. Replace only the placeholder `action` value with the cake order Formspree endpoint:

```html
<form class="enquiry-form" action="https://formspree.io/f/abcdwxyz" method="POST" data-form-type="Cake order">
```

6. In Formspree, configure the notification recipient, spam settings, and confirmation settings as needed.
7. Publish the static website and submit a test cake order.
8. Confirm the success message appears on the website and that the submission arrives in Formspree or the configured inbox.

### Form behavior

- If a placeholder endpoint is still present, the website shows an error message asking editors to replace the endpoint.
- When a real Formspree endpoint accepts the submission, the website shows a success message and clears the form.
- If Formspree returns an error or the network request fails, the website shows an error message asking the customer to try again or contact Tastee Pantry directly.
- The cake order form includes a hidden `_subject` value so incoming notifications can be labelled clearly.

## How to deploy the website

This is a static website and can be deployed on common static hosts:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any standard web hosting with static file upload

Deployment steps for most static hosts:

1. Upload or connect the repository.
2. Use the repository root as the publish directory.
3. Do not set a build command.
4. Confirm `index.html`, `assets/`, and `data/` are all published.

## Notes for editors

- Keep the website focused on Cakery and Bakery only.
- Do not add catering, gift boxes, wholesale, corporate gifting or B2B wording unless the site direction changes again.
- Do not add opening hours unless the business decides to publish them.
- Cake wording should continue to explain that payment is made in store and orders require at least 1 day notice.
- Keep product data concise so cards remain easy to scan on mobile.
