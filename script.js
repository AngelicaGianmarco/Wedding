(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const btnEnter   = document.getElementById('btn-enter');
  const invScreen  = document.getElementById('invitation-screen');
  const glitterContainer = document.getElementById('magic-glitter-container');
  let isTriggered = false;

  // GENERATORE AUTOMATICO DI GLITTER DORATI CONTINUI SULLO SFONDO SATINATO
  function initGlitterShower(amount = 35) {
    for (let i = 0; i < amount; i++) {
      const glitter = document.createElement('div');
      glitter.classList.add('glitter-particle');
      
      const diameter = Math.random() * 5 + 3; // Dimensioni variabili ed evidenti
      glitter.style.width = `${diameter}px`;
      glitter.style.height = `${diameter}px`;
      glitter.style.left = `${Math.random() * 100}vw`;
      
      // Ritardi differenziati per non farli partire tutti insieme
      glitter.style.animationDelay = `${Math.random() * 6}s`;
      glitter.style.animationDuration = `${Math.random() * 5 + 5}s`;
      
      glitterContainer.appendChild(glitter);
    }
  }

  function handleTransition() {
    if (isTriggered) return;
    isTriggered = true;

    // Dissolvenza della nebbia iniziale
    gateScreen.classList.add('fade-out');

    // Mostra istantaneamente l'invito che si trova sotto
    invScreen.classList.remove('hidden-init');
    
    // Attiva la pioggia costante di particelle elfiche sul background satinato
    initGlitterShower(40);

    // Distrugge il blocco a schermo intero protettivo dopo la fine dell'effetto (2 secondi)
    setTimeout(() => {
      gateScreen.style.display = 'none';
    }, 2000);
  }

  // Intercettori di azione su pulsante e su intera area per sicurezza mobile
  if (btnEnter) {
    btnEnter.addEventListener('click', function(e) {
      e.stopPropagation();
      handleTransition();
    });
  }
  gateScreen.addEventListener('click', handleTransition);
  gateScreen.addEventListener('touchstart', handleTransition, { passive: true });

})();
