(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  let hasTriggered = false;

  function activateTransition() {
    if (hasTriggered) return;
    hasTriggered = true;
    
    // Ferma l'autostart se l'utente interagisce prima
    clearTimeout(globalTimer);

    // 1. TERREMOTO COMPLESSIVO (Applica la vibrazione visiva)
    gateScreen.classList.add('shake-active');

    // 2. TRANSIZIONE IN DISSOLVENZA DOPO LO SQUASSAMENTO
    setTimeout(() => {
      gateScreen.classList.remove('shake-active');
      gateScreen.classList.add('fade-out');

      // 3. MOSTRA L'INVITO SBLOCCANDO LA PAGINA
      setTimeout(() => {
        gateScreen.style.display = 'none';
        
        invScreen.classList.remove('hidden-init');
        document.body.style.overflow = 'auto'; // Ripristina lo scorrimento
        window.scrollTo(0, 0);
      }, 1200); // durata dissolvenza fluida
    }, 500); // durata sottomissione scossa
  }

  // Monitoraggio totale del tocco sia su immagine che su intero schermo di blocco
  gateScreen.addEventListener('click', activateTransition);
  gateImg.addEventListener('click', function(e) {
    e.stopPropagation(); // previene conflitti
    activateTransition();
  });
  
  gateScreen.addEventListener('touchstart', activateTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activateTransition(); });

  // APERTURA AUTOMATICA DI EMERGENZA (10 secondi)
  const globalTimer = setTimeout(activateTransition, 10000);

})();
