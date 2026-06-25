// Active nav
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path || (path==='' && a.getAttribute('href')==='index.html'))
      a.classList.add('active');
  });
})();

// Nav shadow on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,0.35)' : 'none';
});

// Smooth scroll anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Formspree AJAX submit
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      } else {
        btn.textContent = 'Try again'; btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Try again'; btn.disabled = false;
    }
  });
}
