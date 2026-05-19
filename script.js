(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  const sparklesContainer = document.getElementById('sparkles-container');
  let hasTriggered = false;

  // CREATORE PARTICELLE GLITTER (Polvere di Fata)
  function spawnGlitter(count = 25) {
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      
      const size = Math.random() * 4 + 2;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${Math.random() * 100}vw`;
      
      sparkle.style.animationDelay = `${Math.random() * 6}s`;
      sparkle.style.animationDuration = `${Math.random() * 4 + 6}s`;
      
      sparklesContainer.appendChild(sparkle);
    }
  }

  function activateTransition() {
    if (hasTriggered) return;
    hasTriggered = true;
    
    clearTimeout(globalTimer);

    // Dissolvenza controllata
    gateScreen.classList.add('fade-out');

    // Rivela l'invito pulito e genera particelle delicate
    invScreen.classList.remove('hidden-init');
    spawnGlitter(25);

    setTimeout(() => {
      gateScreen.style.display = 'none';
    }, 2500);
  }

  gateScreen.addEventListener('click', activateTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation();
      activateTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', activateTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activateTransition(); });

  const globalTimer = setTimeout(activateTransition, 10000);

})();
