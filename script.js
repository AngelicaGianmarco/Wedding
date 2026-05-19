/* ═══════════════════════════════════
   MORIA WEDDING — SCRIPT v2
═══════════════════════════════════ */
(function () {
  'use strict';

  /* ── STARS ── */
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [], W, H, raf;

  function resizeCanvas() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
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
      ctx.fillStyle = `rgba(200,220,255,${a})`; ctx.fill();
    }
    raf = requestAnimationFrame(drawStars);
  }
  resizeCanvas(); createStars(); drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

  /* ── DOOR LOGIC ── */
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

    // rumble
    const arch = document.querySelector('.arch-wrapper');
    let n = 0;
    const rum = setInterval(() => {
      arch.style.transform = `translate(${(Math.random()-.5)*6}px,${(Math.random()-.5)*3}px)`;
      if (++n > 10) { clearInterval(rum); arch.style.transform = ''; }
    }, 60);

    doorEl.classList.add('open');

    setTimeout(() => {
      gateEl.classList.add('fade-out');
      setTimeout(() => {
        gateEl.style.display = 'none';
        cancelAnimationFrame(raf);
        invEl.classList.remove('hidden');
      }, 1300);
    }, 1400);
  }

  doorEl.addEventListener('click', openDoor);
  doorEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openDoor(); });
  const autoTimer = setTimeout(openDoor, 5500);

})();
