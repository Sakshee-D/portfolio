/**
 * Site-wide configuration. Edit values here: they are used everywhere
 * (navbar, hero, contact section, footer).
 *
 * Any empty string ("") is treated as "not configured" and the related
 * button or link is hidden instead of pointing to nowhere.
 */

export const site = {
  name: "Sakshee Dhormale",
  initials: "SD",
  status: "Engineering Student | AI & Software",
  location: "Pune, India",

  // Shown in the contact section and used as the mailto fallback for the form.
  email: "sakshee.dhormale@cumminscollege.in",

  // Public Google Drive folder with all certificates ("View all" button in the Certificates section).
  certificatesFolder: "https://drive.google.com/drive/folders/1-2SUtN6PgVlVndlRA6yiybWBIBvUlQJy",

  // Put your PDF at public/resume/ and keep the path below in sync.
  // The download button appears automatically once the file exists.
  resume: {
    url: "/resume/Sakshee_Dhormale_Resume.pdf",
    downloadName: "Sakshee_Dhormale_Resume.pdf",
  },

  // Contact form backend. Works with Formspree out of the box
  // (https://formspree.io → create a form → paste "https://formspree.io/f/xxxxxx").
  // Any endpoint that accepts a JSON POST and returns 2xx on success also works.
  // Can be overridden with the VITE_CONTACT_ENDPOINT environment variable.
  contactForm: {
    endpoint: import.meta.env.VITE_CONTACT_ENDPOINT || "",
  },
};

export const education = {
  degree: "B.Tech in Electronics and Telecommunication Engineering",
  college: "MKSSS's Cummins College of Engineering for Women, Pune",
  graduation: "May 2027",
  cgpa: "8.7",
};

export const socials = {
  github: "https://github.com/Sakshee-D",
  linkedin: "https://www.linkedin.com/in/sakshee-dhormale-88595129a/",
  leetcode: "https://leetcode.com/u/JEHG9vlHQu/",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];
