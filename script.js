(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  let hasTriggered = false;

  function activateTransition() {
    if (hasTriggered) return;
    hasTriggered = true;
    
    // Ferma il timer automatico se l'utente clicca da solo
    clearTimeout(globalTimer);

    // 1. TERREMOTO SULLA PORTA DI MORIA
    gateScreen.classList.add('shake-active');

    // 2. DISSOLVENZA DOPO IL SUSSULTO
    setTimeout(() => {
      gateScreen.classList.remove('shake-active');
      gateScreen.classList.add('fade-out');

      // 3. RIMOZIONE COMPLETA E VISUALIZZAZIONE INVITO
      setTimeout(() => {
        gateScreen.style.display = 'none';
        
        invScreen.classList.remove('hidden-init');
        document.body.style.overflow = 'auto'; // Abilita lo scorrimento verticale dell'invito
        window.scrollTo(0, 0);
      }, 1200); // durata dissolvenza
    }, 500); // durata terremoto
  }

  // Cattura totale del clic sia sull'immagine della porta che sullo schermo intero
  gateScreen.addEventListener('click', activateTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation(); // Evita doppie attivazioni concorrenti
      activateTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', activateTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activateTransition(); });

  // APERTURA DI SICUREZZA SE NON VIENE EFFETTUATO ALCUN CLIC ENTRO 10 SECONDI
  const globalTimer = setTimeout(activateTransition, 10000);

})();
