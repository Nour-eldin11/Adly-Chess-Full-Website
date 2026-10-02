# Adly Chess Academy

The complete static website is in `dist/`: HTML pages, CSS, JavaScript, product data and images.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Serve the site over HTTP rather than opening HTML files directly: page links and product requests use root-relative paths.

## Hosting

Upload the contents of `dist/` to the root of a static website host. No JavaScript build step is required. The academy page generator is `scripts/build-pages.py`, with source data in `content/`.

## Cart and order requests

`dist/cart.js` and `dist/cart.css` provide the shared cart and checkout. Cart item IDs and quantities are saved in browser localStorage; checkout contact details are not persisted there. Products and displayed prices come from `dist/products.json`.

Checkout sends an order request to `info@adlychess.com` using FormSubmit. The recipient must activate FormSubmit through the email sent to that inbox. Successful submission means the request was accepted by the form service, not that an order is confirmed, paid, or delivered. The academy must confirm stock, options, final prices, delivery costs and payment. Prices are from the existing catalogue snapshot and must be reviewed before confirming orders.

No payment gateway, authoritative inventory, shipping calculator or order-management backend is connected. Card payments require a backend and a merchant payment-provider integration; never collect card details through the email form. FormSubmit, Google Fonts and the embedded Google Map require internet access.
