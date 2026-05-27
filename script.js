// ==========================================
// THEME (light / dark)
// ==========================================
const body       = document.body;
const themeBtn   = document.getElementById('theme-toggle');
const themeIcon  = themeBtn.querySelector('.icon');

const applyTheme = (dark) => {
  body.classList.toggle('dark', dark);
  themeIcon.textContent = dark ? '☀️' : '🌙';
};

const savedTheme  = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

themeBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==========================================
// HAMBURGER MENU
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

const closeMenu = () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('open');
};

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu when any nav link is tapped (mobile)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ==========================================
// ABOUT MODAL
// ==========================================
const aboutModal  = document.getElementById('about-modal');
const modalCard   = document.getElementById('modal-card');
const modalClose  = document.getElementById('modal-close');
const aboutLinks  = [
  document.getElementById('about-link'),
  document.getElementById('about-link-2'),
];

const openModal = (e) => {
  e && e.preventDefault();
  aboutModal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  aboutModal.classList.remove('open');
  document.body.style.overflow = '';
};

aboutLinks.forEach(link => link && link.addEventListener('click', openModal));
modalClose.addEventListener('click', closeModal);

// Close when clicking the scrim (outside the card)
aboutModal.addEventListener('click', (e) => {
  if (!modalCard.contains(e.target)) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeClock();
  }
});

// ==========================================
// CLOCK — easter egg (triple-click logo)
// ==========================================
const clockOverlay = document.getElementById('clock-overlay');
const digitalClock = document.getElementById('digital-clock');
const logoEl       = document.getElementById('logo');

let clickCount = 0;
let clickTimer;

const openClock = () => {
  clockOverlay.classList.add('open');
  clockOverlay.setAttribute('aria-hidden', 'false');
  updateClock();
};

const closeClock = () => {
  clockOverlay.classList.remove('open');
  clockOverlay.setAttribute('aria-hidden', 'true');
};

const updateClock = () => {
  const n = new Date();
  const h = String(n.getHours()).padStart(2, '0');
  const m = String(n.getMinutes()).padStart(2, '0');
  const s = String(n.getSeconds()).padStart(2, '0');
  digitalClock.textContent = `${h}:${m}:${s}`;
};

// Update every second
setInterval(updateClock, 1000);

// Triple-click logo to reveal clock
logoEl.addEventListener('click', (e) => {
  e.preventDefault();
  clickCount++;
  clearTimeout(clickTimer);

  if (clickCount >= 3) {
    clickCount = 0;
    openClock();
    return;
  }

  clickTimer = setTimeout(() => { clickCount = 0; }, 600);
});

clockOverlay.addEventListener('click', closeClock);
