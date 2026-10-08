const root = document.documentElement;
// Keep visible content and accessibility labels in the selected language.
const langButton = document.querySelector("[data-lang]");
const themeButton = document.querySelector("[data-theme-toggle]");
const header = document.querySelector("[data-header]");

function readPreference(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The site remains fully usable when storage is unavailable.
  }
}

function setLanguage(language) {
  const key = language === "en" ? "en" : "zh";
  document.querySelectorAll("[data-zh][data-en]").forEach((node) => {
    node.textContent = node.dataset[key];
  });
  root.lang = key === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-alt-zh][data-alt-en]").forEach((node) => {
    node.alt = node.dataset[key === "en" ? "altEn" : "altZh"];
  });
  document.querySelectorAll("[data-aria-zh][data-aria-en]").forEach((node) => {
    node.setAttribute("aria-label", node.dataset[key === "en" ? "ariaEn" : "ariaZh"]);
  });
  const description = document.querySelector('meta[name="description"]');
  if (description?.dataset.descriptionEn && description.dataset.descriptionZh) {
    description.content = description.dataset[key === "en" ? "descriptionEn" : "descriptionZh"];
  }
  updateThemeLabel();
  if (langButton) {
    langButton.textContent = key === "en" ? "中文" : "EN";
    langButton.setAttribute("aria-label", key === "en" ? "切换为中文" : "Switch to English");
    langButton.title = langButton.getAttribute("aria-label");
  }
  const skipLink = document.querySelector(".skip");
  if (skipLink) skipLink.textContent = key === "en" ? "Skip to content" : "跳到正文";
  const fallbackTitle = key === "en" ? "Jiacong Wang — AI, Education & Humanistic Technology" : "王佳聪 / Jiacong Wang — AI、作品与人文探索";
  document.title = document.body.dataset[key === "en" ? "titleEn" : "titleZh"] || fallbackTitle;
  savePreference("site-language", key);
}

function updateThemeLabel() {
  if (themeButton) {
    const night = root.dataset.theme === "night";
    themeButton.setAttribute("aria-label", root.lang === "en"
      ? (night ? "Switch to light theme" : "Switch to dark theme")
      : (night ? "切换浅色模式" : "切换深色模式"));
    themeButton.title = themeButton.getAttribute("aria-label");
  }
}

function setTheme(theme) {
  root.dataset.theme = theme;
  updateThemeLabel();
  const themeColor = document.querySelector('meta[name="theme-color"]') || document.head.appendChild(Object.assign(document.createElement("meta"), { name: "theme-color" }));
  themeColor.content = theme === "night" ? "#101512" : "#f2efe8";
  savePreference("site-theme", theme);
}

langButton?.addEventListener("click", () => setLanguage(root.lang === "en" ? "zh" : "en"));
themeButton?.addEventListener("click", () => setTheme(root.dataset.theme === "night" ? "paper" : "night"));
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
setTheme(readPreference("site-theme", matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "paper"));
setLanguage(readPreference("site-language", "zh"));

const currentNav = document.querySelector(".current-nav");
if (currentNav) {
  currentNav.setAttribute("aria-current", "page");
  if (matchMedia("(max-width: 980px)").matches) {
    requestAnimationFrame(() => currentNav.scrollIntoView({ block: "nearest", inline: "center" }));
  }
}

document.querySelectorAll("img").forEach((image) => {
  image.decoding = "async";
  const isPrimary = image.closest(".hero,.project-hero,.about-hero");
  if (!isPrimary && !image.hasAttribute("loading")) image.loading = "lazy";
});

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
}
