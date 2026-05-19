(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  let hasTriggered = false;

  function activateTransition() {
    if (hasTriggered) return;
    hasTriggered = true;
    
    clearTimeout(globalTimer);

    // Fa partire la dissolvenza lenta e fumosa da CSS
    gateScreen.classList.add('fade-out');

    // Al termine esatto dei 2.5 secondi rimuove lo schermo di blocco completamente
    setTimeout(() => {
      gateScreen.style.display = 'none';
    }, 2500);
  }

  // Intercetta clic ovunque
  gateScreen.addEventListener('click', activateTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation();
      activateTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', activateTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activateTransition(); });

  // Apertura automatica dopo 10 secondi se non viene fatto clic
  const globalTimer = setTimeout(activateTransition, 10000);

})();
