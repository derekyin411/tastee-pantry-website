# DEVARO Website Project Notes

This file is the working project record for the DEVARO website. It acts as the project's lightweight database / memory until a proper CMS or business database is created.

## Project identity

- New brand / website name: DEVARO
- Previous working site name: Tastee Pantry
- GitHub repository: derekyin411/tastee-pantry-website
- GitHub Pages temporary URL: https://derekyin411.github.io/tastee-pantry-website/
- Current public status: GitHub Pages site on a public GitHub repository
- Current build type: static website using HTML, CSS, JavaScript, JSON data files, and GitHub Pages
- Operational contact email still used on site: tasteepantrynz@hotmail.com

## Brand direction

DEVARO should be treated as a cleaner, more premium brand direction for the user's bakery/cakery business.

Preferred direction from previous brand discussion:

- Modern Asian food, crafted in New Zealand
- Minimal wordmark direction
- Black-based premium visual identity
- Charcoal black, warm white, grey and restrained warm gold / beige accents
- Avoid childish bakery icons
- Avoid chef-hat, cartoon bread, generic macaron imagery
- Future logo concept may incorporate cake or Taiwanese bread references rather than buns / dumplings

## Current site direction

The website is simplified to focus on two customer-facing sections only:

1. Cakery
2. Bakery

The site should feel premium, focused and visually confident. It should not look like a broad wholesale supplier website or a cluttered catering website.

## Current homepage design

The homepage now uses a black split-screen concept:

- Left / first choice: Cakery
- Right / second choice: Bakery
- Main brand panel: DEVARO
- Tone: black, minimal, premium, warm accent details

## Current navigation

- Home
- Cakery
- Bakery
- Contact

## Removed from current version

The following sections / wording were intentionally removed and should not be re-added unless the business direction changes:

- Catering
- Festival Gift Boxes
- Wholesale / Corporate Enquiries
- Corporate gifting
- B2B / wholesale wording

## Cakery section

Purpose:

- Birthday cakes
- Custom cakes
- Customer order request form

Current rules:

- Payment is made in store.
- Cake orders require at least 1 day notice.
- Orders are subject to confirmation and availability.
- The cake order form is Formspree-ready but still needs a real Formspree endpoint before it can properly receive orders.

Data file:

- data/cakes.json

Image folder:

- assets/images/cakes/

## Bakery section

Purpose:

- Daily bakery product display
- Retail product browsing
- Modern Asian bakery feel

Suggested categories:

- Sweet buns
- Savoury buns
- Rolls
- Cakes and slices
- Seasonal bakery products

Data file:

- data/bakery.json

Image folder:

- assets/images/bakery/

## Current key files

- index.html: main website page
- assets/styles.css: website styling
- assets/script.js: product card loading, navigation and form logic
- data/cakes.json: cakery product cards
- data/bakery.json: bakery product cards
- README.md: technical instructions for previewing, editing, images, Formspree and deployment
- PROJECT_NOTES.md: business/project memory and working notes

## Formspree status

The cake order form currently uses a placeholder endpoint:

https://formspree.io/f/YOUR_FORM_ID

Before using the website for real cake orders, create a Formspree form and replace the placeholder endpoint in index.html with the real endpoint.

Do not use mailto as the main order submission method.

## Logo status

Logo has not been replaced yet.

Recommended future file path:

assets/images/logo.png

Once the logo image is uploaded, update the header to use the image instead of the current text / D mark.

## Product image status

Real product images still need to be added.

Recommended image naming rules:

- Use lowercase English file names.
- Use hyphens instead of spaces.
- Do not use Chinese characters or random phone filenames.
- Examples:
  - classic-fresh-cream-cake.jpg
  - chocolate-birthday-cake.jpg
  - custard-bun.jpg
  - coconut-bun.jpg

## Next recommended work

1. Confirm the DEVARO black split-screen version is showing correctly on GitHub Pages.
2. Review whether the new visual direction feels premium enough.
3. Upload the DEVARO logo.
4. Replace the header brand mark with the logo.
5. Prepare and upload real cake images.
6. Prepare and upload real bakery product images.
7. Replace placeholder cake and bakery product data.
8. Create Formspree form endpoint for cake orders.
9. Replace the placeholder Formspree endpoint.
10. Test cake order submission.
11. Later: buy and connect a formal DEVARO domain.

## Important caution

Do not let the site become too broad again. The current strategic decision is to keep the first public version simple: Cakery + Bakery only. If additional business lines are needed later, they should be added only after the core site looks professional and the cake order process works reliably.

Do not store passwords, customer records, banking details, IRD details or other sensitive credentials in this repository.