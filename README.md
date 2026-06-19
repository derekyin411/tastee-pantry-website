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

## How to update form email settings

The forms use `mailto:` links for version 1, so no backend service or payment integration is required. Submitting a form opens the customer's email app with the enquiry details pre-filled.

To change the recipient email address:

1. Open `assets/script.js`.
2. Update the `SITE_EMAIL` value near the top of the file.

Current value:

```js
const SITE_EMAIL = 'tasteepantrynz@hotmail.com';
```

For a future version, the forms can be connected to a form service or backend endpoint if Tastee Pantry wants submissions to work without relying on the customer's email app.

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
