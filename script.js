(function () {
  'use strict';

  /* ── GENERATORE STELLE DI SFONDO ── */
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [], W, H, raf;

  function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function createStars(n = 200) {
    stars = Array.from({length: n}, () => ({
      x: Math.random() * W, y: Math.random() * H * 0.8,
      r: Math.random() * 1.3 + 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * Math.PI * 2
    }));
  }
  function drawStars(t = 0) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const a = s.alpha * (0.4 + 0.6 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(195,215,245,${a})`; ctx.fill();
    }
    raf = requestAnimationFrame(drawStars);
  }
  resizeCanvas(); createStars(); drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

  /* ── LOGICA DI TRANSIZIONE DELLA PORTA ── */
  const triggerEl = document.getElementById('gate-trigger');
  const gateEl    = document.getElementById('gate-screen');
  const invEl     = document.getElementById('invitation-screen');
  const hintEl    = document.getElementById('click-hint');
  let isTransitioning = false;

  function triggerTransition() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    hintEl.classList.add('hidden');
    clearTimeout(autoOpenTimer);

    // Effetto Terremoto/Scuotimento (Rumble) sulla porta prima di svanire
    triggerEl.classList.add('rumble');

    // Dopo un piccolo sussulto, parte la dissolvenza verso l'invito grafico
    setTimeout(() => {
      triggerEl.classList.remove('rumble');
      gateEl.classList.add('fade-out');

      setTimeout(() => {
        gateEl.style.display = 'none';
        cancelAnimationFrame(raf);
        // Mostra l'invito reale
        invEl.classList.remove('hidden');
        window.scrollTo({ top: 0 });
      }, 1400); // tempo dissolvenza
    }, 600); // durata scuotimento
  }

  // Eventi di click e accessibilità
  triggerEl.addEventListener('click', triggerTransition);
  triggerEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') triggerTransition(); });

  // 10 SECONDI DI ATTESA AUTOMATICA SE L'UTENTE NON CLICCA
  const autoOpenTimer = setTimeout(triggerTransition, 10000);

})();
