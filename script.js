(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const invScreen  = document.getElementById('invitation-screen');
  let hasTriggered = false;

  function activateTransition() {
    if (hasTriggered) return;
    hasTriggered = true;
    
    // Ferma l'autostart automatico se l'utente ha cliccato da solo
    clearTimeout(globalTimer);

    // 1. EFFETTO TERREMOTO (Fa tremare lo schermo)
    gateScreen.classList.add('shake-active');

    // 2. AVVIO DISSOLVENZA DOPO IL SUSSULTO
    setTimeout(() => {
      gateScreen.classList.remove('shake-active');
      gateScreen.classList.add('fade-out');

      // 3. RIMOZIONE FINALE E SBLOCCO SCROLL INVITO
      setTimeout(() => {
        gateScreen.style.display = 'none';
        
        // Rende visibile l'invito reale sotto
        invScreen.classList.remove('hidden-init');
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
      }, 1200); // durata della dissolvenza fluida
    }, 500); // durata del terremoto
  }

  // Intercetta QUALSIASI tipo di tocco o clic su schermo intero
  gateScreen.addEventListener('click', activateTransition);
  gateScreen.addEventListener('touchstart', activateTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activateTransition(); });

  // APERTURA AUTOMATICA DOPO 10 SECONDI (Se l'utente non fa nulla)
  const globalTimer = setTimeout(activateTransition, 10000);

})();
