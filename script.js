(function () {
  'use strict';

  /* ── 1. CANVASES & STELLE (LOGICA NATIVA ORIGINALE) ── */
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [], W, H, raf;

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  function createStars(n = 260) {
    stars = Array.from({length: n}, () => ({
      x: Math.random() * W, y: Math.random() * H * .8,
      r: Math.random() * 1.5 + .2,
      alpha: Math.random() * .7 + .2,
      speed: Math.random() * .006 + .001,
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

  /* ── 2. LOGICA DI APERTURA E ACCESSO (CORRETTA E SICURA) ── */
  const doorEl       = document.getElementById('door-container');
  const archContainer = document.querySelector('.arch-container'); // Wrapper per tremolio
  const hintEl       = document.getElementById('click-hint');
  const gateEl       = document.getElementById('gate-screen');
  const invEl        = document.getElementById('invitation-screen');
  const invEffect    = document.getElementById('magic-glitter-container'); // Effetto sull'invito
  
  let isTransitioning = false; // Flag di sicurezza

  function triggerWeddingOpening() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Ferma timer automatici di emergenza
    clearTimeout(autoTimerEmergency);
    hintEl.classList.add('hidden');

    // Tremolio dell'Arco al click
    let n = 0;
    const rumbler = setInterval(() => {
      archContainer.style.transform = `translate(${(Math.random()-.5)*6}px,${(Math.random()-.5)*3}px)`;
      if (++n > 10) { clearInterval(rumbler); archContainer.style.transform = ''; }
    }, 60);

    // Apre le ante della porta di pietra
    doorEl.classList.add('open');

    // Dissolvenza fumosa della nebbia scura (2 secondi)
    setTimeout(() => {
      gateEl.classList.add('fade-out');
      
      // Rivela l'invito e inietta i glitter magici
      invEl.classList.remove('hidden-init');
      initGlitterShower(35); // Genera particelle sull'invito

      setTimeout(() => {
        gateEl.style.display = 'none';
        cancelAnimationFrame(raf); // ferma stars canvas per salvare memoria
      }, 2000);
    }, 1300); // tempo dissolvenza
  }

  // Intercettazione su intero schermo di blocco per sicurezza tocco mobile
  gateEl.addEventListener('click', triggerWeddingOpening);
  gateEl.addEventListener('touchstart', triggerWeddingOpening, { passive: true });
  gateEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') triggerWeddingOpening(); });

  // Apertura automatica temporizzata a 12 secondi (Se l'utente non fa nulla)
  const autoTimerEmergency = setTimeout(triggerWeddingOpening, 12000);

  /* ── 3. EFFETTO SPECIALE: GLITTER FLUTTUANTI (POLVERE ELFICA) SULL'INVITO ── */
  function initGlitterShower(amount = 35) {
    if (!invEffect) return;
    for (let i = 0; i < amount; i++) {
      const glitter = document.createElement('div');
      glitter.classList.add('glitter-particle');
      
      const diameter = Math.random() * 5 + 3; // Dimensioni visibili
      glitter.style.width = `${diameter}px`;
      glitter.style.height = `${diameter}px`;
      glitter.style.left = `${Math.random() * 100}vw`;
      glitter.style.animationDelay = `${Math.random() * 6}s`;
      glitter.style.animationDuration = `${Math.random() * 5 + 5}s`;
      
      invEffect.appendChild(glitter);
    }
  }

})();
