/* ==========================================================
   AKILESH A K — portfolio interactions (anime.js)
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveNav();
  initPageFade();
  initHeroSequence();
  initScanline();
  initReveal();
  initCounters();
  initCardTilt();
  initSkillNavScroll();
});

/* ---- mobile nav toggle ---- */
function initNavToggle(){
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ---- highlight current page in nav ---- */
function initActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path || (path === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });
}

/* ---- whole-page fade in ---- */
function initPageFade(){
  if(typeof anime === 'undefined') return;
  anime({
    targets: 'body',
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutQuad'
  });
}

/* ---- hero split-screen entrance ---- */
function initHeroSequence(){
  if(typeof anime === 'undefined') return;
  const hero = document.querySelector('.hero');
  if(!hero) return;

  const tl = anime.timeline({ easing: 'easeOutExpo' });

  tl.add({
    targets: '.scan-node::before',
    duration: 1
  });

  tl.add({
    targets: '.hero-half.blue .hero-tag, .hero-half.red .hero-tag',
    opacity: [0,1],
    translateY: [16, 0],
    duration: 600,
  }, 200)
  .add({
    targets: '.hero-half.blue .hero-name, .hero-half.red .hero-name',
    opacity: [0,1],
    translateY: [26, 0],
    duration: 750,
  }, 300)
  .add({
    targets: '.hero-half.blue .hero-role, .hero-half.red .hero-role',
    opacity: [0,1],
    translateY: [16, 0],
    duration: 600,
  }, 550)
  .add({
    targets: '.hero-half.blue .hero-desc, .hero-half.red .hero-desc',
    opacity: [0,1],
    translateY: [16, 0],
    duration: 650,
  }, 650)
  .add({
    targets: '.hero-half.blue .hero-cta, .hero-half.red .hero-cta',
    opacity: [0,1],
    translateY: [12, 0],
    duration: 550,
  }, 800);

  anime({
    targets: '.hero-mark',
    scale: [0, 1],
    opacity: [0, 1],
    duration: 700,
    delay: 150,
    easing: 'easeOutBack'
  });
}

/* ---- animated scan pulse down the center divider ---- */
function initScanline(){
  if(typeof anime === 'undefined') return;
  const line = document.querySelector('.scanline');
  if(!line) return;

  const heroHeight = document.querySelector('.hero').offsetHeight;

  anime({
    targets: '.scanline',
    translateY: [0, heroHeight - 90],
    opacity: [0, 1, 1, 0],
    duration: 4200,
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate'
  });
}

/* ---- scroll reveal for .reveal elements ---- */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        if(typeof anime !== 'undefined'){
          anime({
            targets: entry.target,
            opacity: [0,1],
            translateY: [24, 0],
            duration: 800,
            easing: 'easeOutCubic',
            delay: parseInt(entry.target.dataset.delay || 0, 10)
          });
        } else {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'none';
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => io.observe(el));
}

/* ---- animated stat counters ---- */
function initCounters(){
  const nums = document.querySelectorAll('[data-count]');
  if(!nums.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const end = parseInt(el.dataset.count, 10);
        const obj = { val: 0 };
        if(typeof anime !== 'undefined'){
          anime({
            targets: obj,
            val: end,
            duration: 1400,
            easing: 'easeOutExpo',
            round: 1,
            update: () => { el.textContent = obj.val + (el.dataset.suffix || ''); }
          });
        } else {
          el.textContent = end + (el.dataset.suffix || '');
        }
        io.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  nums.forEach(el => io.observe(el));
}

/* ---- subtle tilt on glass/neu cards ---- */
function initCardTilt(){
  const cards = document.querySelectorAll('.panel-card, .nav-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if(typeof anime !== 'undefined'){
        anime({
          targets: card,
          rotateX: (-y * 4) + 'deg',
          rotateY: (x * 6) + 'deg',
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    });
    card.addEventListener('mouseleave', () => {
      if(typeof anime !== 'undefined'){
        anime({ targets: card, rotateX: 0, rotateY: 0, duration: 500, easing: 'easeOutElastic(1, .6)' });
      }
    });
  });
}

/* ---- skills page: highlight sticky nav on scroll ---- */
function initSkillNavScroll(){
  const groups = document.querySelectorAll('.skill-group');
  const links = document.querySelectorAll('.skill-nav a');
  if(!groups.length || !links.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector('.skill-nav a[href="#' + id + '"]');
      if(!link) return;
      if(entry.isIntersecting) {
        links.forEach(l => l.classList.remove('in-view'));
        link.classList.add('in-view');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  groups.forEach(g => io.observe(g));
}
