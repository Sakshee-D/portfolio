export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** True for absolute http(s) URLs. Empty strings and placeholders return false. */
export function isValidUrl(value) {
  if (!value || typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/** Accepts absolute URLs and in-page anchors such as "#projects". */
export function isUsableLink(value) {
  return isValidUrl(value) || (typeof value === "string" && /^#[\w-]+$/.test(value));
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
