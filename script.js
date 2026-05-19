/* ═══════════════════════════════════
   MORIA WEDDING — SCRIPT ORIGINALE V3
═══════════════════════════════════ */
(function () {
  'use strict';

  /* ── CANVASES & STELLE (LOGICA NATIVA RIGIDA) ── */
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [], W, H, raf;

  function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function createStars(n = 260) {
    stars = Array.from({length: n}, () => ({
      x: Math.random() * W, y: Math.random() * H * .75,
      r: Math.random() * 1.4 + .2,
      alpha: Math.random() * .7 + .2,
      speed: Math.random() * .008 + .003,
      phase: Math.random() * Math.PI * 2
    }));
  }
  function drawStars(t = 0) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const a = s.alpha * (.5 + .5 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(160,200,255,${a})`; ctx.fill();
    }
    raf = requestAnimationFrame(drawStars);
  }
  resizeCanvas(); createStars(); drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

  /* ── SISTEMA DI APERTURA DELLA PORTA E SBLOCCO SCHERMO ── */
  const doorEl    = document.getElementById('door-container');
  const hintEl    = document.getElementById('click-hint');
  const gateEl    = document.getElementById('gate-screen');
  const invEl     = document.getElementById('invitation-screen');
  let opened = false;

  function openDoor() {
    if (opened) return;
    opened = true;
    hintEl.classList.add('hidden');
    clearTimeout(autoTimer);

    // Effetto tremolio dell'arco protettivo al click
    const arch = document.querySelector('.arch-wrapper');
    let n = 0;
    const rum = setInterval(() => {
      arch.style.transform = `translate(${(Math.random()-.5)*6}px,${(Math.random()-.5)*3}px)`;
      if (++n > 10) { clearInterval(rum); arch.style.transform = ''; }
    }, 60);

    // Attivazione dell'apertura ad ante rotanti
    doorEl.classList.add('open');

    // Transizione nebbiosa fluida verso lo schermo dell'invito
    setTimeout(() => {
      gateEl.classList.add('fade-out');
      setTimeout(() => {
        gateEl.style.display = 'none';
        cancelAnimationFrame(raf);
        invEl.classList.remove('hidden');
      }, 2000);
    }, 1200);
  }

  // Intercettori pronti per click e touch su ogni dispositivo
  gateEl.addEventListener('click', openDoor);
  gateEl.addEventListener('touchstart', openDoor, { passive: true });

  // Apertura automatica di sicurezza regolata a 12 secondi
  const autoTimer = setTimeout(openDoor, 1200);

})();
