export function smoothScrollToHash(href: string) {
  if (typeof window === "undefined" || !href.startsWith("#") || href.length <= 1) {
    return false;
  }

  const target = document.getElementById(href.slice(1));
  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
