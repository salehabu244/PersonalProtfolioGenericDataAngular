# Personal Portfolio — Software Engineer (.NET · Angular · SQL Server)

A one-page portfolio built with **Angular 21** (standalone components) and **SCSS**.

## Run it

```bash
npm install
npm start        # http://127.0.0.1:4200
npm run build    # production build → dist/portfolio
```

## Where to change things

**Almost everything you'd want to edit lives in one file:**

```
src/app/core/portfolio.data.ts
```

| Export        | What it controls                                              |
| ------------- | ------------------------------------------------------------- |
| `PROFILE`     | Name, initials, title, tagline, **email**, phone, links, CV path |
| `EMAILJS`     | EmailJS service/template/public keys for contact-form delivery |
| `FORMSUBMIT`  | Enables the no-signup FormSubmit delivery backend (default on) |
| `ABOUT`       | The paragraph summary and interest chips                      |
| `SKILL_GROUPS`| Skill groups (Backend / Frontend / Database / Tools) and chips|
| `EXPERIENCE`  | Roles, companies, dates, achievements, stack tags             |
| `PROJECTS`    | Project cards, descriptions, stack, demo/GitHub links         |
| `CERTIFICATIONS` | Certificates, issuer, ID, year, credential URL             |
| `STATS`       | The four hero counters                                        |
| `NAV_LINKS`   | Header navigation items                                       |

### Other common edits

| Task                          | File                                                        |
| ----------------------------- | ----------------------------------------------------------- |
| SEO title, description, OG tags | `src/index.html`                                          |
| Colours, spacing, radii       | `src/styles.scss` (design tokens in `:root`)                 |
| Accent / theme colours        | `src/styles.scss` → `--accent`, `--accent-2`, and the `[data-theme='dark']` block |
| CV / resume file              | `public/assets/Alex-Carter-CV.pdf` (replace with yours)      |
| Header + mobile menu          | `src/app/layout/navbar/`                                     |
| Footer                        | `src/app/layout/footer/`                                     |
| Section markup                | `src/app/sections/<section>/`                                |

## Contact form delivery

The form sends to **fazlamijotosob@gmail.com**. Three modes exist; the code picks the first
one that applies:

| # | Mode | When | Behaviour |
| - | ---- | ---- | --------- |
| 1 | **EmailJS** | all three `EMAILJS` IDs are filled in | Server-side send with a 15-second per-browser rate limit. Finest control, but needs a free account. |
| 2 | **FormSubmit** *(default)* | `FORMSUBMIT.enabled` is `true` | Server-side send to `https://formsubmit.co/ajax/<PROFILE.email>`. **No account, no API key, no server to host** — this is why the form works out of the box. |
| 3 | **mailto: fallback** | both of the above are off | Opens the visitor's own mail client. Only useful if they actually have one configured. |

### FormSubmit activation (one time)

FormSubmit has no registration, but it does verify the destination address once:

1. Submit the form (or let me run a test) → FormSubmit emails `fazlamijotosob@gmail.com`.
2. Open that email and click **"Activate Form"**.
3. Every later submission is delivered normally.

Before activation the endpoint answers `success: "false"` with a *"needs Activation"* message.
The code treats that as a **failure** — the visitor sees the error panel, never a fake
"Message sent". The real reason is logged to the console as
`[contact] delivery failed:`.

> **Tip:** if messages arrive but you can't find them, check Gmail's **Spam** and
> **Promotions** tabs, then mark them as *Not spam* and add
> `no-reply@formsubmit.co` to your contacts.

### Enabling EmailJS (optional, ~5 minutes, free)

1. Sign up at <https://dashboard.emailjs.com> — free tier is 200 emails/month.
2. **Email Services** → add Gmail → copy the **Service ID**.
3. **Email Templates** → New template:
   - **To Email:** `fazlamijotosob@gmail.com`
   - **From Name:** `{{from_name}}`
   - **Reply To:** `{{reply_to}}`
   - **Subject:** `{{subject}}`
   - **Content:** `{{message}}`
   → copy the **Template ID**.
4. **Account → General** → copy the **Public Key**.
5. Paste all three into `EMAILJS` in `src/app/core/portfolio.data.ts`.
6. **(Recommended)** Account → Security → *Allowed origins*, add your deployed domain so the
   public key can only be used from your site.

The three template variables `from_name`, `reply_to`, `subject`, `message` are what the code
sends — keep those names in the template. If a send fails, the visitor sees an error panel with
a direct `mailto:` link to you, and their message stays in the form.

## Design & accessibility notes

- **Theming** — `ThemeService` (`src/app/core/theme.service.ts`) toggles `data-theme` on
  `<html>` and persists to `localStorage`. An inline script in `index.html` applies the saved
  theme *before* Angular boots, so there is no flash of the wrong theme.
- **Contrast** — text colours use theme-aware tokens (`--accent-text`, `--accent-2-text`,
  `--text-faint`, `--ok`, `--danger`) rather than the raw accent, so both themes clear
  WCAG AA. Keep using these tokens for any new text; `--accent` is for gradients and icons.
- **Motion** — scroll animations use a single `IntersectionObserver`
  (`src/app/shared/reveal.directive.ts`) and are disabled entirely under
  `prefers-reduced-motion: reduce`.
- **Images** — project thumbnails are inline SVG, so they cost no extra HTTP requests.

## Verified

| Check                            | Result                          |
| -------------------------------- | ------------------------------- |
| Production build                 | Clean, no warnings — ~94 kB transfer |
| Lighthouse accessibility         | 100                             |
| Lighthouse SEO                   | 100                             |
| Lighthouse best practices        | 100                             |
| axe-core (both themes)           | 0 violations — WCAG 2.0/2.1/2.2 AA **+ best-practice** rules |
| Contact form validation          | Errors show/clear correctly, `aria-invalid` wired |
| Contact form send paths          | FormSubmit live send returns `success:"true"`; pre-activation correctly reports **failure** rather than a false success; retry preserves the message |
| Mobile menu                      | `aria-expanded`, Escape-to-close, not focusable when closed |
