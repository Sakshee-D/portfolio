/**
 * Certificates gallery. While this array is empty, the section shows an
 * empty state instead of cards.
 *
 * Fields:
 *   title         certificate title
 *   issuer        issuing organization ("" to hide)
 *   date          completion date, e.g. "Mar 2025" ("" to hide)
 *   credentialId  optional, "" to hide
 *   skills        tags
 *   url           "View Certificate" link; "" to hide
 *
 * The "View all certificates" button uses site.certificatesFolder in site.js.
 * Only add certificates you have actually earned, with their real details.
 */

export const certificates = [
  {
    title: "Buffer 2025 Hackathon: 1st Position",
    issuer: "Buffer 2025",
    date: "2025",
    credentialId: "",
    skills: ["Data Structures", "Algorithms", "Nirbhaya"],
    url: "https://drive.google.com/file/d/18oqaH0WXaDCREpFF73ovHbxtuS4-ab2X/view?usp=drive_link",
  },
  {
    title: "Gen AI Cloud Cohort Program",
    issuer: "",
    date: "",
    credentialId: "",
    skills: ["Generative AI", "Cloud"],
    url: "https://drive.google.com/file/d/1ccsZ-XX3D3lnApBOQyLVK37ihuwh_v3v/view?usp=drive_link",
  },
  {
    title: "Fluxus Devcraft 2024: 24-hour Hackathon Participant",
    issuer: "IIT Indore",
    date: "2024",
    credentialId: "",
    skills: ["Hackathon", "Software Development"],
    url: "https://drive.google.com/file/d/1Yy3bssEp6sgQidtqDuFLQCjmtM7LAmTK/view?usp=drive_link",
  },
  {
    title: "Mozilla Festival Organizing & Promotion",
    issuer: "Mozilla Campus Club",
    date: "",
    credentialId: "",
    skills: ["Event Organization", "Community"],
    url: "https://drive.google.com/file/d/1g264-0gHtcTlmtmIh_FWTNkPlt82BKvJ/view?usp=drive_link",
  },
];
