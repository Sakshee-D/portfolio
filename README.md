# Sakshee Dhormale — Portfolio

Personal portfolio built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and **Lucide** icons.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

Requires Node.js 18+.

## Project structure

```
├── index.html                  # metadata, fonts, favicon
├── public/
│   ├── favicon.svg
│   └── resume/                 # put your resume PDF here
└── src/
    ├── App.jsx                 # page composition
    ├── index.css               # Tailwind layers + shared component classes
    ├── data/                   # ← all editable content lives here
    │   ├── site.js             # name, email, socials, resume path, form endpoint, nav
    │   ├── projects.js         # projects + filter categories
    │   ├── experience.js       # internship + open-source timeline
    │   ├── certificates.js     # certificate gallery (empty state until filled)
    │   ├── skills.js           # tech stack groups and icons
    │   └── achievements.js     # highlights
    ├── components/
    │   ├── layout/             # Navbar, Footer, Logo, ScrollProgress
    │   ├── sections/           # Hero, About, Projects, Experience, Certificates,
    │   │                       # TechStack, Achievements, Contact
    │   ├── hero/               # HeroVisual (animated SVG circuit)
    │   ├── projects/           # ProjectCard, ProjectModal, ProjectLinks
    │   ├── contact/            # ContactForm
    │   └── ui/                 # Button, Section, Reveal, SocialLinks
    ├── hooks/                  # active section, file check, scroll lock
    └── lib/utils.js            # URL/email validation helpers
```

## Configuration

Everything you'll want to edit is in `src/data/`. Empty strings (`""`) mean
"not configured": the matching button or link is **hidden** rather than
pointing to a fake URL.

### Resume

1. Save your PDF as `public/resume/Sakshee_Dhormale_Resume.pdf`
   (or change `site.resume.url` in `src/data/site.js`).
2. The **Resume** button in the hero appears automatically once the file exists.

### Email and social links

In `src/data/site.js`:

```js
email: "you@example.com",
socials: {
  github: "https://github.com/Sakshee-D",
  linkedin: "https://www.linkedin.com/in/your-handle/",
},
```

The email shows in the contact section and footer, and is used as the contact form fallback.

### Contact form

The form posts JSON to `site.contactForm.endpoint`. The easiest setup is [Formspree](https://formspree.io):

1. Create a free form and copy its endpoint (`https://formspree.io/f/xxxxxxx`).
2. Either paste it into `contactForm.endpoint` in `src/data/site.js`, or set the
   `VITE_CONTACT_ENDPOINT` environment variable (see `.env.example`). On Vercel or Netlify,
   add it under the project's environment variables.

How the form behaves:

| Configured | Behaviour |
| --- | --- |
| Endpoint | Validates, sends, and shows loading / success / error states |
| Email only | Validates, then opens the visitor's email app with the message pre-filled |
| Neither | Shows a note that the form isn't connected yet; it never fakes a successful send |

### Projects

Edit `src/data/projects.js`. The array order is the display order. For each project:

- `links.github` / `links.demo`: buttons only render for valid `https://` URLs.
- `categories`: values from `PROJECT_CATEGORIES`; filter buttons are generated only for categories in use.
- `metrics`: optional; only add numbers you have validated. (The Fake News 96.2% figure is
  commented out until you confirm it.)
- `featured: true`: renders a wider, highlighted card.

To add a project, copy an existing object, give it a unique `id`, and edit the fields.

### Experience

Edit `src/data/experience.js`. Fill in `period` (e.g. `"Jun 2025 – Aug 2025"`) and
`location` when you want them shown. Add pull-request links to the ArviZ entry's `links` array.

### Certificates

Add objects to the array in `src/data/certificates.js` (the template is in the file comments).
The "coming soon" empty state disappears automatically once there is at least one entry.
The **View all certificates** button links to `site.certificatesFolder` in `src/data/site.js`
(the public Google Drive folder); set it to `""` to hide the button.

### Achievements

Edit `src/data/achievements.js`. Add a profile link (e.g. LeetCode) to the
problem-solving entry when you have one; entries without a link URL show no link.

## Deployment

**Vercel:** import the repository; the Vite preset is detected automatically
(build command `npm run build`, output `dist`).

**Netlify:** build command `npm run build`, publish directory `dist`.

## Accessibility and performance notes

- Semantic landmarks, skip link, visible focus rings, labelled controls, keyboard-operable menu and modal (Esc to close, focus trapped and restored).
- `prefers-reduced-motion` is respected: Framer Motion transforms are disabled, CSS animations stop, and the hero circuit pulses stop.
