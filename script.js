(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  const glitterContainer = document.getElementById('magic-glitter-container');
  let isTriggered = false;

  // GENERATORE CONTINUO DI POLVERE DI FATA (GLITTER DORATI)
  function initGlitterShower(amount = 35) {
    for (let i = 0; i < amount; i++) {
      const glitter = document.createElement('div');
      glitter.classList.add('glitter-particle');
      
      const diameter = Math.random() * 4 + 3; // Dimensione ottimale ed evidente
      glitter.style.width = `${diameter}px`;
      glitter.style.height = `${diameter}px`;
      glitter.style.left = `${Math.random() * 100}vw`;
      
      glitter.style.animationDelay = `${Math.random() * 6}s`;
      glitter.style.animationDuration = `${Math.random() * 5 + 5}s`;
      
      glitterContainer.appendChild(glitter);
    }
  }

  function handleTransition() {
    if (isTriggered) return;
    isTriggered = true;

    clearTimeout(globalTimer);

    // Attiva la transizione lenta nebbiosa della Porta di Moria
    gateScreen.classList.add('fade-out');

    // Rivela istantaneamente l'invito sottostante e inietta la pioggia dorata
    invScreen.classList.remove('hidden-init');
    initGlitterShower(35);

    // Rimuove l'overlay protettivo dopo la fine della transizione
    setTimeout(() => {
      gateScreen.style.display = 'none';
    }, 2500);
  }

  // Eventi pronti e reattivi per smartphone e PC
  gateScreen.addEventListener('click', handleTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation();
      handleTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', handleTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handleTransition(); });

  // Auto-apertura temporizzata a 10 secondi per sicurezza
  const globalTimer = setTimeout(handleTransition, 10000);

})();
