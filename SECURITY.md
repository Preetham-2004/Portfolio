# Security review and deployment requirements

Reviewed on 2026-10-09. This is a static React/Vite portfolio with direct EmailJS
submission, not a backend with authentication or a database. Review covered app
entry points, routing, DOM rendering, terminal input, contact submission, external
links, local storage, assets, environment handling, dependencies, tests and Vercel
configuration. This is a source review and local verification, not a guarantee of
absence of vulnerabilities or a penetration test of deployed infrastructure.

## Changes

- The initial npm audit reported eight affected dependency entries (six high,
  two moderate). These were build-tool dependencies, not evidence of a remote
  attack on the deployed static site. Tailwind 4 and its PostCSS plugin replace
  the vulnerable Tailwind 3 dependency chain; source-map-js was patched through
  the lockfile. The resulting dependency audit reports zero known vulnerabilities.
- Contact submission requires a reCAPTCHA v2 token. Missing configuration, a failed
  widget, or an expired token prevents sending. Every send attempt clears the
  token and creates a fresh widget. EmailJS receives only the four intended form
  fields and the CAPTCHA response, rather than every field in the DOM.
- Submit-time length validation complements HTML input limits. Whitespace,
  honeypot, and concurrent-send guards remain. These checks improve browser
  behavior; they cannot prevent callers from bypassing the browser entirely.
- The build rejects undocumented `VITE_` variables. The four documented public
  values are intentionally visible to visitors. No private key belongs in them.
- Vercel headers now include HSTS and prohibit base URL overrides. CSP allows only
  the required reCAPTCHA script/frame/connect paths alongside existing resources.
  Inline scripts remain blocked; inline styles remain necessary for the UI.
- Browser regression tests passed during the original review. The test suite and
  its tooling were subsequently removed at the owner's request; browser behavior
  now requires manual verification.

## Required account configuration before enabling the contact form

1. Register a **reCAPTCHA v2 checkbox** site with your production domain and any
   explicitly approved preview/local domains. Set its public site key as
   `VITE_RECAPTCHA_SITE_KEY` locally and in Vercel. Do not use Google's test keys
   in production.
2. In the EmailJS template settings, enable **reCAPTCHA V2 verification** and store
   the corresponding reCAPTCHA secret key **there**, never in browser variables.
   A token check in React is not a security boundary. Without EmailJS enforcement,
   attackers can still call the public EmailJS API directly.
3. Configure EmailJS's origin allowlist. Keep the template recipient fixed to your
   own inbox; do not accept a recipient, CC, or BCC from submitted variables.
   Avoid unescaped HTML interpolation of visitor text in templates and disable
   unnecessary auto-reply templates. Review provider quotas and rate limits.
4. On a dedicated test template, confirm EmailJS rejects missing/invalid tokens,
   then verify a real solved CAPTCHA and inbox delivery. Browser-side checks alone
   cannot establish server-side enforcement or delivery.
5. Redeploy after updating environment variables. Until all four public values
   are configured, the form is disabled and the email link remains available.

Provider instructions:
[EmailJS CAPTCHA integration](https://www.emailjs.com/docs/user-guide/adding-captcha-verification/),
[EmailJS abuse protections](https://www.emailjs.com/docs/faq/does-emailjs-expose-my-account-to-spam/),
[Google reCAPTCHA rendering](https://developers.google.com/recaptcha/docs/display),
[Vite public environment variables](https://vite.dev/guide/env-and-mode).

## Validation and scope limits

Run `npm ci`, `npm run lint`, `npm run format:check`, `npm run build`,
and `npm audit` before release. Manually verify navigation, responsive layouts,
terminal scrolling, CAPTCHA expiry/failure, and contact-form behavior.

Only deploy `dist/`; never publish the repository, `.env`, or `node_modules`. The local `.env` is ignored and was not found in the available Git
history; its variable names match the three existing public EmailJS settings.
No credentials were printed in this review. This does not establish that values
have never been shared elsewhere.

Check real response headers and routing on a Vercel Preview; the local preview
server does not apply Vercel configuration.
Review desktop and mobile appearance after the Tailwind 4 upgrade. It targets
Safari 16.4+, Chrome 111+, and Firefox 128+.

The removed GitHub Actions workflow has not been recreated. Checks must currently
be run manually. Provider dashboards, secret rotation, deployed headers, DNS,
account access controls, and actual mail delivery were not verified here.
