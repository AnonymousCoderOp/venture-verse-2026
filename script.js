// --- 1. Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const edcLogo = document.getElementById('edc-logo');
const footerEdcLogo = document.getElementById('footer-edc-logo');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
      document.body.removeAttribute('data-theme');
      themeIcon.textContent = '☀️';
      if (edcLogo) edcLogo.src = 'assets/edc-light.png';
      if (footerEdcLogo) footerEdcLogo.src = 'assets/edc-light.png';
    } else {
      document.body.setAttribute('data-theme', 'light');
      themeIcon.textContent = '🌙';
      if (edcLogo) edcLogo.src = 'assets/edc-dark.png';
      if (footerEdcLogo) footerEdcLogo.src = 'assets/edc-dark.png';
    }
  });
}

// --- 2. Event 3D Flip Countdown Timer ---
const eventDate = new Date("November 12, 2026 10:00:00").getTime();
const daysEl = document.getElementById("cd-days");
const hoursEl = document.getElementById("cd-hours");
const minsEl = document.getElementById("cd-mins");
const secsEl = document.getElementById("cd-secs");

function updateFlipTimer(el, newValue) {
  if (el.textContent !== newValue) {
    el.textContent = newValue;
    el.classList.remove('flip-animate');
    void el.offsetWidth; // Trigger reflow
    el.classList.add('flip-animate');
  }
}

if (daysEl && hoursEl && minsEl && secsEl) {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(timer);
      const container = document.querySelector('.countdown-container');
      if (container) container.innerHTML = "<h3 style='color: var(--accent);'>Event Started!</h3>";
      return;
    }

    let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString();
    let secs = Math.floor((distance % (1000 * 60)) / 1000).toString();

    updateFlipTimer(daysEl, days.padStart(2, '0'));
    updateFlipTimer(hoursEl, hours.padStart(2, '0'));
    updateFlipTimer(minsEl, mins.padStart(2, '0'));
    updateFlipTimer(secsEl, secs.padStart(2, '0'));
  }, 1000);
}

// --- 3. Continuous Multi-Directional Scroll Reveal ---
const scrollElements = document.querySelectorAll('.card, .timeline-item, .speaker-card, .team-card, .section-header');

scrollElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -20px 0px"
});

scrollElements.forEach(el => revealObserver.observe(el));