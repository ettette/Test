const pages = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["programs.html", "Programs & Support"],
  ["communities.html", "Working With Communities"],
  ["volunteer.html", "Volunteer"],
  ["contact.html", "Contact"],
];

const current = location.pathname.split("/").pop() || "index.html";
const navLinks = pages
  .map(([href, label]) => `<a href="${href}" ${current === href ? 'aria-current="page"' : ""}>${label}</a>`)
  .join("");

document.querySelector("#site-header").innerHTML = `
  <header>
    <div class="main-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Indigenous Futures Initiative home">
          <span class="brand-seal" aria-hidden="true"><b>IFI</b></span>
          <span class="brand-words"><strong>Indigenous Futures</strong><small>Initiative</small></span>
        </a>
        <div class="header-actions">
          <a href="communities.html"><small>Communities</small><strong>Work with us</strong></a>
          <a href="volunteer.html"><small>Students</small><strong>Volunteer with us</strong></a>
          <a class="contact-button" href="contact.html">Contact us</a>
        </div>
        <button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
      </div>
    </div>
    <nav class="nav-bar" aria-label="Main navigation"><div class="container desktop-nav">${navLinks}</div></nav>
    <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">${navLinks}</nav>
  </header>
`;

document.querySelector("#site-footer").innerHTML = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-brand">Indigenous Futures<br><span>Initiative</span></p>
        <p class="footer-summary">A Bay Area student-led organization working with Native communities through tutoring, STEM, engineering, test preparation, and other community-led projects.</p>
      </div>
      <div>
        <p class="footer-label">Quick links</p>
        <a href="about.html">About us</a>
        <a href="programs.html">Programs and support</a>
        <a href="communities.html">Working with communities</a>
        <a href="volunteer.html">Volunteer</a>
      </div>
      <div>
        <p class="footer-label">Contact</p>
        <p>Bay Area, California</p>
        <a href="mailto:lucashhcai@gmail.com">lucashhcai@gmail.com</a>
        <a class="footer-button" href="contact.html">Contact us</a>
      </div>
    </div>
    <div class="footer-bottom"><div class="container">
      <span>© <span id="year"></span> Indigenous Futures Initiative</span>
      
    </div></div>
  </footer>
`;

document.querySelector("#year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector("#mobile-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileNav.classList.toggle("open", !open);
});
