/* ═══════════════════════════════════════════════
   FIORELLA DELLA VALLE — main.js
   Scia fiori, scroll reveal, fumetti coniglio
   ═══════════════════════════════════════════════ */

/* ── SCIA DI FIORI AL CURSORE ── */
(function(){
  const petals = ['🌸','🌺','✿','🌷','❀'];
  let lastX = 0, lastY = 0;
  let throttle = false;

  document.addEventListener('mousemove', (e) => {
    if(throttle) return;
    throttle = true;
    setTimeout(() => { throttle = false; }, 60); /* max ~16 fiori/sec */

    /* Crea solo se il cursore si è mosso abbastanza */
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if(Math.hypot(dx, dy) < 12) return;
    lastX = e.clientX;
    lastY = e.clientY;

    const el = document.createElement('div');
    el.textContent = petals[Math.floor(Math.random() * petals.length)];
    el.style.cssText = `
      position: fixed;
      left: ${e.clientX - 8}px;
      top:  ${e.clientY - 8}px;
      font-size: ${10 + Math.random() * 10}px;
      pointer-events: none;
      z-index: 99998;
      opacity: 1;
      transition: opacity 0.8s ease, transform 0.8s ease;
      transform: translate(0,0) rotate(0deg);
      user-select: none;
    `;
    document.body.appendChild(el);

    /* Anima verso l'alto e sfuma */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const drift = (Math.random() - 0.5) * 40;
        el.style.opacity = '0';
        el.style.transform = `translate(${drift}px, -30px) rotate(${(Math.random()-0.5)*60}deg)`;
      });
    });

    setTimeout(() => el.remove(), 900);
  });
})();

/* ── SCROLL REVEAL ── */
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

/* ── FUMETTI CONIGLIO (solo stanza.html) ── */
(function(){
  const rabbit = document.querySelector('.rabbit-fixed');
  if(!rabbit) return;

  const phrases = [
    'Il tè si raffredda, sbrigati.',
    'Qui siamo quasi tutti matti.',
    'Quella torta al cioccolato sembra deliziosa.',
    'È sempre l\'ora del tè.',
    'Non ho tutto il giorno... o forse sì.'
  ];
  let idx = 0;

  /* Crea il fumetto */
  const bubble = document.createElement('div');
  bubble.style.cssText = `
    position: fixed;
    left: 90px;
    bottom: 40px;
    z-index: 21;
    background: rgba(245,237,216,0.96);
    border: 0.5px solid rgba(200,152,58,0.5);
    border-radius: 12px 12px 12px 2px;
    padding: 9px 14px;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 0.88rem;
    color: #4A3828;
    box-shadow: 0 4px 16px rgba(34,24,16,0.15);
    max-width: 200px;
    line-height: 1.4;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease;
    white-space: normal;
  `;
  document.body.appendChild(bubble);

  function showNext(){
    bubble.textContent = phrases[idx % phrases.length];
    idx++;
    bubble.style.opacity = '1';
    /* Dopo 2.5s sfuma */
    setTimeout(() => {
      bubble.style.opacity = '0';
    }, 3000);
  }

  /* Prima apparizione dopo 1.5s, poi ogni 4s */
  setTimeout(() => {
    showNext();
    setInterval(showNext, 4000);
  }, 1500);
})();

/* ── PAGE ENTRY FADE ── */
(function(){
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
})();
