(function () {
  'use strict';

  /* ── 1. SFONDO STELLATO PORTA ── */
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [], W, H, raf;

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  function createStars(n = 240) {
    stars = Array.from({length: n}, () => ({
      x: Math.random() * W, y: Math.random() * H * .8,
      r: Math.random() * 1.4 + .2,
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

  /* ── 2. LOGICA DI APERTURA ── */
  const doorEl        = document.getElementById('door-container');
  const archContainer = document.querySelector('.arch-container');
  const gateEl        = document.getElementById('gate-screen');
  const invEl         = document.getElementById('invitation-screen');
  const glitterCont   = document.getElementById('magic-glitter-container');
  let opened = false;

  function handleWeddingOpen() {
    if (opened) return;
    opened = true;
    
    clearTimeout(safetyTimer);

    // Tremolio dell'Arco
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
      archContainer.style.transform = `translate(${(Math.random()-.5)*6}px,${(Math.random()-.5)*3}px)`;
      if (++shakeCount > 10) { clearInterval(shakeInterval); archContainer.style.transform = ''; }
    }, 60);

    // Apertura Ante
    doorEl.classList.add('open');

    // Transizione all'Invito
    setTimeout(() => {
      gateEl.classList.add('fade-out');
      invEl.classList.remove('hidden-init');
      initGlitterShower(40); // Avvia glitter

      setTimeout(() => {
        gateEl.style.display = 'none';
        cancelAnimationFrame(raf);
      }, 2000);
    }, 1200);
  }

  gateEl.addEventListener('click', handleWeddingOpen);
  gateEl.addEventListener('touchstart', handleWeddingOpen, { passive: true });

  const safetyTimer = setTimeout(handleWeddingOpen, 12000);

  /* ── 3. GLITTER SFONDO INVITO ── */
  function initGlitterShower(amount = 40) {
    if (!glitterCont) return;
    for (let i = 0; i < amount; i++) {
      const glitter = document.createElement('div');
      glitter.classList.add('glitter-particle');
      
      const size = Math.random() * 5 + 3;
      glitter.style.width = `${size}px`;
      glitter.style.height = `${size}px`;
      glitter.style.left = `${Math.random() * 100}vw`;
      glitter.style.animationDelay = `${Math.random() * 6}s`;
      glitter.style.animationDuration = `${Math.random() * 5 + 6}s`;
      
      glitterCont.appendChild(glitter);
    }
  }

})();
