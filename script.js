(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  let hasTriggered = false;

  function activateTransition() {
    if (hasTriggered) return;
    hasTriggered = true;
    
    clearTimeout(globalTimer);

    // 1. EFFETTO TERREMOTO PORTA
    gateScreen.classList.add('shake-active');

    // 2. AVVIO DISSOLVENZA DOPO IL SUSSULTO
    setTimeout(() => {
      gateScreen.classList.remove('shake-active');
      gateScreen.classList.add('fade-out');

      // 3. APERTURA INVITO SOTTOSTANTE
      setTimeout(() => {
        gateScreen.style.display = 'none';
        invScreen.classList.remove('hidden-init');
        document.body.style.overflow = 'auto'; // Sblocca scroll verticale dell'invito
        window.scrollTo(0, 0);
      }, 1200);
    }, 500);
  }

  // Intercettazione sicura di clic e touch
  gateScreen.addEventListener('click', activateTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation();
      activateTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', activateTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activateTransition(); });

  // Fallback di apertura automatica a 10 secondi
  const globalTimer = setTimeout(activateTransition, 10000);

})();
