# Tastee Pantry Website

A clean static MVP website for Tastee Pantry, an Auckland bakery business. The site supports retail browsing, birthday cake order requests, catering enquiries, festival gift box enquiries, and wholesale / corporate enquiries without requiring a backend.

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
    catering/
    gift-boxes/
  script.js
  styles.css
data/
  cakes.json
  bakery.json
  catering.json
  gift-boxes.json
index.html
```

## How to replace images

1. Add the new image file to the relevant folder:
   - Birthday cakes: `assets/images/cakes/`
   - Bakery products: `assets/images/bakery/`
   - Catering: `assets/images/catering/`
   - Gift boxes: `assets/images/gift-boxes/`
2. Use web-friendly image names with lowercase letters and hyphens, for example `chocolate-birthday-cake.jpg`.
3. Open the matching JSON file in `data/`.
4. Update the `image` value to the new file path, for example:

```json
"image": "assets/images/cakes/chocolate-birthday-cake.jpg"
```

If an image is missing or the path is not available yet, the website still displays a branded placeholder panel.

## How to add new products

Product cards are controlled by JSON data files:

- Birthday cakes: `data/cakes.json`
- Bakery products: `data/bakery.json`
- Catering options: `data/catering.json`
- Festival gift boxes: `data/gift-boxes.json`

Add a new object inside the array. Example bakery product:

```json
{
  "name": "Custard Sweet Bun",
  "category": "Sweet buns",
  "description": "Soft sweet bun with a custard-style filling for retail display.",
  "image": "assets/images/bakery/custard-sweet-bun.jpg"
}
```

Gift boxes can also include an `enquiryLabel` field to show a button on the card.

## How to connect the Formspree forms

The website stays fully static. The three enquiry forms submit directly to Formspree endpoints with `POST` requests, so no custom backend or `mailto:` form submission is required.

There are three separate placeholder form actions in `index.html`:

- Birthday cake orders: `https://formspree.io/f/YOUR_FORM_ID`
- Catering enquiries: `https://formspree.io/f/YOUR_FORM_ID`
- Wholesale / corporate enquiries: `https://formspree.io/f/YOUR_FORM_ID`

Replace each placeholder with the correct Formspree endpoint before publishing the forms.

### Step-by-step Formspree setup

1. Sign in to Formspree or create an account at <https://formspree.io/>.
2. Create a new form for birthday cake orders.
3. Copy the endpoint URL Formspree provides. It normally looks like `https://formspree.io/f/abcdwxyz`.
4. Open `index.html` and find the birthday cake order form near `id="cake-order"`.
5. Replace only the placeholder `action` value with the birthday cake Formspree endpoint:

```html
<form class="enquiry-form" action="https://formspree.io/f/abcdwxyz" method="POST" data-form-type="Birthday cake order">
```

6. Repeat the same process for the catering enquiry form.
7. Repeat the same process for the wholesale / corporate enquiry form.
8. In Formspree, configure each form's notification recipient, spam settings, and confirmation settings as needed.
9. Publish the static website and submit a test enquiry for each form.
10. Confirm the success message appears on the website and that the submission arrives in Formspree or the configured inbox.

### Form behavior

- If a placeholder endpoint is still present, the website shows an error message asking editors to replace the endpoint.
- When a real Formspree endpoint accepts the submission, the website shows a success message and clears the form.
- If Formspree returns an error or the network request fails, the website shows an error message asking the customer to try again or contact Tastee Pantry directly.
- Each form includes a hidden `_subject` value so incoming notifications can be labelled by enquiry type.

## How to deploy the website

This is a static website and can be deployed on common static hosts:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any standard web hosting with static file upload

Deployment steps for most static hosts:

1. Upload or connect the repository.
2. Use the repository root as the publish directory.
3. Do not set a build command.
4. Confirm `index.html`, `assets/`, and `data/` are all published.

## Notes for editors

- Do not add opening hours unless the business decides to publish them.
- Birthday cake wording should continue to explain that payment is made in store and orders require at least 1 day notice.
- Keep product data concise so cards remain easy to scan on mobile.
