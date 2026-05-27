// ==========================================
// THEME (light / dark)
// ==========================================
const body      = document.body;
const themeBtn  = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('.icon');

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

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ==========================================
// ABOUT MODAL
// ==========================================
const aboutModal = document.getElementById('about-modal');
const modalCard  = document.getElementById('modal-card');
const modalClose = document.getElementById('modal-close');
const aboutLinks = [
  document.getElementById('about-link'),
  document.getElementById('about-link-2'),
];

const openModal = (e) => {
  e && e.preventDefault();
  aboutModal.classList.add('open');
};

const closeModal = () => {
  aboutModal.classList.remove('open');
};

aboutLinks.forEach(link => link && link.addEventListener('click', openModal));
modalClose.addEventListener('click', closeModal);
aboutModal.addEventListener('click', (e) => {
  if (!modalCard.contains(e.target)) closeModal();
});

// ==========================================
// CLOCK — easter egg (double-click logo)
// ==========================================
const clockOverlay = document.getElementById('clock-overlay');
const digitalClock = document.getElementById('digital-clock');
const logoEl       = document.getElementById('logo');

// Open / close
const openClock = () => {
  updateClock();
  clockOverlay.classList.add('open');
};

const closeClock = () => {
  clockOverlay.classList.remove('open');
};

// Tick every second
const updateClock = () => {
  const n = new Date();
  digitalClock.textContent = [
    String(n.getHours()).padStart(2, '0'),
    String(n.getMinutes()).padStart(2, '0'),
    String(n.getSeconds()).padStart(2, '0'),
  ].join(':');
};
setInterval(updateClock, 1000);
updateClock();

// Double-click logo to open clock
logoEl.addEventListener('dblclick', (e) => {
  e.preventDefault();
  openClock();
});

// Tap/click anywhere on clock overlay to close
clockOverlay.addEventListener('click', closeClock);

// ==========================================
// ESCAPE KEY — close anything open
// ==========================================
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeModal();
  closeClock();
});
