const navItems = [
  { href: "index.html", label: "Home" },
  {
    label: "About",
    links: [
      { href: "about.html", label: "About Us" },
      { href: "land-acknowledgement.html", label: "Land Acknowledgement" },
    ],
  },
  {
    label: "Get Involved",
    links: [
      { href: "programs.html", label: "Programs & Support" },
      { href: "communities.html", label: "Working With Communities" },
      { href: "volunteer.html", label: "Volunteer" },
    ],
  },
  { href: "blog.html", label: "Blog" },
  { href: "holidays.html", label: "Holidays" },
  { href: "contact.html", label: "Contact" },
];

const current = location.pathname.split("/").pop() || "index.html";
const renderDesktopNav = (items) =>
  items
    .map((item) => {
      if (!item.links) {
        return `<a href="${item.href}" ${current === item.href ? 'aria-current="page"' : ""}>${item.label}</a>`;
      }

      const hasCurrent = item.links.some((link) => current === link.href);
      const links = item.links
        .map((link) => `<a href="${link.href}" ${current === link.href ? 'aria-current="page"' : ""}>${link.label}</a>`)
        .join("");

      return `
        <div class="nav-item nav-dropdown ${hasCurrent ? "active" : ""}">
          <button class="nav-trigger" type="button" aria-expanded="false">${item.label}</button>
          <div class="nav-menu">${links}</div>
        </div>
      `;
    })
    .join("");

const renderMobileNav = (items) =>
  items
    .map((item) => {
      if (!item.links) {
        return `<a href="${item.href}" ${current === item.href ? 'aria-current="page"' : ""}>${item.label}</a>`;
      }

      const links = item.links
        .map((link) => `<a href="${link.href}" ${current === link.href ? 'aria-current="page"' : ""}>${link.label}</a>`)
        .join("");

      return `<div class="mobile-nav-group"><span>${item.label}</span>${links}</div>`;
    })
  .join("");

const desktopNavLinks = renderDesktopNav(navItems);
const mobileNavLinks = renderMobileNav(navItems);

document.querySelector("#site-header").innerHTML = `
  <header>
    <div class="main-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Indigenous Futures Coalition home">
          <span class="brand-seal" aria-hidden="true"><img src="assets/indigenouslogo.png" alt=""></span>
          <span class="brand-words"><strong>Indigenous Futures Coalition</strong></span>
        </a>
        <div class="header-actions">
          <a href="communities.html"><strong>Work with us</strong></a>
          <a href="volunteer.html"><strong>Volunteer with us</strong></a>
          <a class="contact-button" href="contact.html">Contact us</a>
        </div>
        <button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
      </div>
    </div>
    <nav class="nav-bar" aria-label="Main navigation"><div class="container desktop-nav">${desktopNavLinks}</div></nav>
    <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">${mobileNavLinks}</nav>
  </header>
`;

document.querySelector("#site-footer").innerHTML = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <div class="footer-brand-lockup">
          <img class="footer-logo" src="assets/indigenouslogo.png" alt="">
          <p class="footer-brand">Indigenous Futures<br><span>Coalition</span></p>
        </div>
        <p class="footer-summary">A Bay Area student-led organization working with Native communities through tutoring, STEM, engineering, test preparation, and other community-led projects.</p>
      </div>
      <div>
        <p class="footer-label">Quick links</p>
        <a href="about.html">About us</a>
        <a href="programs.html">Programs and support</a>
        <a href="communities.html">Working with communities</a>
        <a href="volunteer.html">Volunteer</a>
        <a href="land-acknowledgement.html">Land acknowledgement</a>
        <a href="blog.html">Blog</a>
        <a href="holidays.html">Indigenous holidays</a>
      </div>
      <div>
        <p class="footer-label">Contact</p>
        <p>Bay Area, California</p>
        <a href="mailto:indigenousfuturecoalition@gmail.com">indigenousfuturecoalition@gmail.com</a>
        <a class="footer-button" href="contact.html">Contact us</a>
      </div>
    </div>
    <div class="footer-bottom"><div class="container">
      <span>© <span id="year"></span> Indigenous Futures Coalition</span>
      
    </div></div>
  </footer>
`;

document.querySelector("#year").textContent = new Date().getFullYear();

document.body.classList.add("has-countdown-dock");
document.body.insertAdjacentHTML(
  "beforeend",
  `
    <aside class="countdown-dock" aria-label="Countdown to Indigenous Peoples' Day">
      <a class="countdown-dock-main" href="holidays.html">
        <span class="countdown-dock-label">Indigenous Peoples' Day</span>
        <strong data-countdown-date>October 12, 2026</strong>
      </a>
      <div class="countdown-dock-grid" data-countdown>
        <span><strong data-countdown-days>0</strong><em>Days</em></span>
        <span><strong data-countdown-hours>0</strong><em>Hours</em></span>
        <span><strong data-countdown-minutes>0</strong><em>Min</em></span>
        <span><strong data-countdown-seconds>0</strong><em>Sec</em></span>
      </div>
    </aside>
  `
);

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector("#mobile-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileNav.classList.toggle("open", !open);
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let pageIsLeaving = false;

document.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest("a") : null;
  if (
    !link ||
    pageIsLeaving ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.target === "_blank" ||
    link.hasAttribute("download") ||
    reducedMotion.matches
  ) {
    return;
  }

  const destination = new URL(link.href, window.location.href);
  const current = new URL(window.location.href);
  const isInternalPage =
    destination.origin === current.origin &&
    (destination.pathname.endsWith(".html") || destination.pathname.endsWith("/"));
  const isSamePageAnchor =
    destination.pathname === current.pathname &&
    destination.search === current.search &&
    destination.hash;

  if (!isInternalPage || isSamePageAnchor) return;

  event.preventDefault();
  pageIsLeaving = true;
  document.body.classList.add("page-leaving");

  window.setTimeout(() => {
    window.location.assign(destination.href);
  }, 180);
});

window.addEventListener("pageshow", () => {
  pageIsLeaving = false;
  document.body.classList.remove("page-leaving");
});

const countdowns = document.querySelectorAll("[data-countdown]");
if (countdowns.length) {
  const getIndigenousPeoplesDay = (year) => {
    const octoberFirst = new Date(year, 9, 1);
    const daysUntilMonday = (8 - octoberFirst.getDay()) % 7;
    return new Date(year, 9, 1 + daysUntilMonday + 7);
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const updateCountdown = () => {
    const now = new Date();
    let target = getIndigenousPeoplesDay(now.getFullYear());
    target.setHours(0, 0, 0, 0);
    const targetEnd = new Date(target);
    targetEnd.setHours(23, 59, 59, 999);

    if (now > targetEnd) {
      target = getIndigenousPeoplesDay(now.getFullYear() + 1);
      target.setHours(0, 0, 0, 0);
    }

    const distance = Math.max(target - now, 0);
    const totalSeconds = Math.floor(distance / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.querySelectorAll("[data-countdown-date]").forEach((element) => {
      element.textContent = formatDate(target);
    });
    document.querySelectorAll("[data-countdown-days]").forEach((element) => {
      element.textContent = String(days);
    });
    document.querySelectorAll("[data-countdown-hours]").forEach((element) => {
      element.textContent = String(hours).padStart(2, "0");
    });
    document.querySelectorAll("[data-countdown-minutes]").forEach((element) => {
      element.textContent = String(minutes).padStart(2, "0");
    });
    document.querySelectorAll("[data-countdown-seconds]").forEach((element) => {
      element.textContent = String(seconds).padStart(2, "0");
    });
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}
