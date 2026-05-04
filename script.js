// ── Splash ───────────────────────────────────
const splash = document.getElementById('splash');
if (splash) {
  document.body.style.overflow = 'hidden';
  let gone = false;
  const dismiss = () => {
    if (gone) return;
    gone = true;
    splash.classList.add('hide');
    document.body.style.overflow = '';
    setTimeout(() => splash.remove(), 700);
  };
  setTimeout(() => {
    window.addEventListener('wheel',     dismiss, { once: true });
    window.addEventListener('touchmove', dismiss, { once: true, passive: true });
    window.addEventListener('keydown',   dismiss, { once: true });
  }, 700);
}

// ── NAV scroll ──────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile menu ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
let open = false;

hamburger.addEventListener('click', () => {
  open = !open;
  mobileNav.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  const [a, b] = hamburger.querySelectorAll('span');
  if (open) {
    a.style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
    b.style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
  } else {
    a.style.cssText = '';
    b.style.cssText = '';
  }
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    open = false;
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});

// ── FAQ ──────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const ans = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = '0';
    });

    if (!isOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// ── Reveal on scroll ─────────────────────────
const reveals = document.querySelectorAll(
  '.step, .feature, .plan, .faq-item, .compare-card'
);
reveals.forEach(el => el.setAttribute('data-reveal', ''));

new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }).observe
  ? reveals.forEach((el, i) => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i % 3 * 60);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
      io.observe(el);
    })
  : reveals.forEach(el => el.classList.add('visible'));

// ── WhatsApp mask ────────────────────────────
const wa = document.getElementById('whatsapp');
if (wa) {
  wa.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length >= 7) {
      v = v.length === 11
        ? `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`
        : `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
    } else if (v.length >= 3) {
      v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    } else if (v.length >= 1) {
      v = `(${v}`;
    }
    e.target.value = v;
  });
}

// ── Form submit ──────────────────────────────
const form = document.getElementById('form');
const formOk = document.getElementById('formOk');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  const label = btn.querySelector('.btn-label');
  btn.disabled = true;
  label.textContent = 'Enviando...';

  // troca pelo endpoint real
  setTimeout(() => {
    form.style.display = 'none';
    formOk.classList.add('show');
  }, 1200);
});

// ── Smooth scroll ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 72, behavior: 'smooth' });
  });
});
