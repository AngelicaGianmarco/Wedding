(function () {
  'use strict';

  /* ── CANVA STELLATO DI SFONDO ── */
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [], W, H, raf;

  function resizeCanvas() { 
    W = canvas.width = window.innerWidth; 
    H = canvas.height = window.innerHeight; 
  }
  function createStars(n = 180) {
    stars = Array.from({length: n}, () => ({
      x: Math.random() * W, 
      y: Math.random() * H * 0.8,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.004 + 0.002,
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
  
  resizeCanvas(); 
  createStars(); 
  drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

  /* ── ATTIVAZIONE TRANSIZIONE CORRETTA ── */
  const triggerEl = document.getElementById('gate-trigger');
  const gateEl    = document.getElementById('gate-screen');
  const invEl     = document.getElementById('invitation-screen');
  const hintEl    = document.getElementById('click-hint');
  let isDone = false;

  function startTransition() {
    if (isDone) return;
    isDone = true;
    
    // Rimuove subito la scritta "Tocca per entrare" e ferma il timer automatico
    if(hintEl) hintEl.classList.add('hidden');
    clearTimeout(autoTimer);

    // 1. EFFETTO TERREMOTO: Fa sussultare la porta
    triggerEl.classList.add('rumble');

    // 2. DISSOLVENZA FLUIDA SULLO SCHERMO INTERO
    setTimeout(() => {
      triggerEl.classList.remove('rumble');
      gateEl.classList.add('fade-out');

      // 3. APERTURA COMPLETA DELL'INVITO REALE
      setTimeout(() => {
        gateEl.style.display = 'none';
        cancelAnimationFrame(raf);
        
        // Rende visibile l'invito vero e proprio
        invEl.classList.remove('hidden');
        document.body.style.overflow = 'auto'; // Sblocca lo scroll della pagina
        window.scrollTo(0, 0);
      }, 1500); // Durata della dissolvenza fluida
    }, 600); // Durata del terremoto iniziale
  }

  // Aggancia i click su computer, smartphone e tastiera
  triggerEl.addEventListener('click', startTransition);
  triggerEl.addEventListener('touchend', function(e) {
    e.preventDefault(); // Previene problemi di doppio clic su dispositivi iOS/Android
    startTransition();
  });
  triggerEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') startTransition(); });

  // TIMER AUTOMATICO DI 10 SECONDI (Se l'utente non tocca, si apre da sola)
  const autoTimer = setTimeout(startTransition, 10000);

})();
