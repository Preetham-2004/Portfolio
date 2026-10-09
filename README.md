# Preetham Bhat portfolio

React, TypeScript, and Vite portfolio hosted at https://preetham-bhat.vercel.app/.

## Local development

Use Node.js 22.12 or newer within Node 22 (`.nvmrc` selects Node 22).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env.local` instead of `cp` if needed.
Fill in the three EmailJS values and `VITE_RECAPTCHA_SITE_KEY` in `.env.local`.
Use a reCAPTCHA v2 checkbox site key. Never commit private credentials.
`VITE_` variables are embedded in the browser bundle, so use only the EmailJS
public key here, not a private key.

## Checks before pushing

```sh
npm run lint
npm run format:check
npm run build
npm audit
```

The build runs TypeScript checks before producing `dist/`. Manually check desktop/mobile
layout, theme switching, project links, browser history, terminal scrolling,
CAPTCHA, and contact-form delivery before each release.
Use `npm run format` to format source files. Run the checks above before deploying;
this checkout does not contain a GitHub Actions workflow.

## Vercel deployment

- Framework: **Vite**.
- Node.js version: **22.x**.
- Install command: `npm ci`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and
  `VITE_EMAILJS_PUBLIC_KEY`, plus `VITE_RECAPTCHA_SITE_KEY`, in Vercel environment settings for
  Production and any Preview deployments that should send messages.
- Redeploy after changing environment values: Vite embeds them at build time.

`vercel.json` rewrites `/projects/*` to `index.html` so shared project links and
refreshes reach the React application. Other missing paths retain Vercel's 404
behavior. See [Vercel's Vite SPA documentation](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas)
and [Vite's environment-variable documentation](https://vite.dev/guide/env-and-mode).

Review a Vercel Preview before promoting the changes. Check the homepage,
`/projects/marketplace` opened directly and refreshed, mobile navigation, and the
resume download. A real contact-form delivery check requires the EmailJS service
and template to be configured. Verify inbox delivery and account domain restrictions/quotas.

## Security and launch checks

The deployment sets a Content Security Policy, denies framing, disables unused
camera/microphone/location permissions, and prevents MIME sniffing. The CSP permits
Google Fonts, local assets, the EmailJS API, and the required Google reCAPTCHA paths. Inline styles remain allowed for
React and the animation components; inline scripts are blocked. Vite preview does not apply the headers in `vercel.json`.
Verify the actual response headers on a Vercel Preview before launch. Third-party
scripts (including optional preview toolbars) need a deliberate policy update.
See [Vercel's header configuration](https://vercel.com/docs/project-configuration/vercel-json#headers).

Configure the EmailJS origin allowlist for your production domain and approved
preview domains. Keep the template recipient fixed to your own inbox, and verify
that `name`, `email`, `subject`, and `message` map to the intended template fields.
The hidden bot field, whitespace validation, and duplicate-submit guard are
client-side conveniences, not a security boundary: callers can bypass browser
code. EmailJS provides provider-side rate limits, origin restrictions, and optional
[CAPTCHA verification](https://www.emailjs.com/docs/user-guide/adding-captcha-verification/).
The form requires reCAPTCHA v2 and resets verification after every send attempt.
Enable **reCAPTCHA V2 verification** in the EmailJS template settings and enter
the reCAPTCHA secret key there. Never put that secret in Vercel client variables.
Register production and approved preview domains in the reCAPTCHA dashboard.
The browser token check alone does not stop direct API requests: EmailJS must
reject missing, invalid, expired, and reused tokens. Verify this on a dedicated
test template before launch. Review the provider's
[abuse protections](https://www.emailjs.com/docs/faq/does-emailjs-expose-my-account-to-spam/)
and monitor quotas. This repository cannot verify your account settings.

If EmailJS values or the CAPTCHA site key are absent, the form clearly reports that it is unavailable and
points visitors to the email link in About. Test one real delivery after deployment.

Theme choice survives reloads (and still works when browser storage is blocked).
A keyboard skip link, reduced-motion handling, a render-error fallback, and a
no-JavaScript contact link provide alternate ways to reach the content.

## Performance notes

Unused legacy components, styles, media, and 3D libraries have been removed.
EmailJS loads only when a message is submitted, and image elements use lazy
loading. The existing animated greeting remains for standard-motion visitors;
reduced-motion visitors bypass it. The greeting duration is 3 seconds
before its exit transition. Fingerprinted assets receive immutable cache headers.
Some source screenshots are still large PNGs
and can be compressed further in a future asset-only update.

## Security review

See [SECURITY.md](SECURITY.md) for the review scope, fixes, and remaining launch requirements.
Tailwind 4 replaces the vulnerable Tailwind 3 build dependency chain; it requires
modern browsers (Safari 16.4+, Chrome 111+, Firefox 128+).
The build rejects undocumented `VITE_` variables to help prevent accidental
client-side secret exposure. Only the four public contact configuration values
listed in `.env.example` are allowed.
