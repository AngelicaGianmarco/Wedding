(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  const sparklesContainer = document.getElementById('sparkles-container');
  let hasTriggered = false;

  // GENERATORE AUTOMATICO EFFETTO SPECIALI GLITTER (Polvere di Stelle Elfica)
  function spawnGlitter(count = 30) {
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      
      const size = Math.random() * 5 + 2; // Dimensioni variabili
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${Math.random() * 100}vw`;
      
      // Ritardi e velocità casuali per naturalezza fluida
      sparkle.style.animationDelay = `${Math.random() * 6}s`;
      sparkle.style.animationDuration = `${Math.random() * 5 + 5}s`;
      
      sparklesContainer.appendChild(sparkle);
    }
  }

  function activateTransition() {
    if (hasTriggered) return;
    hasTriggered = true;
    
    clearTimeout(globalTimer);

    // Attiva la transizione fumosa lenta definita nel CSS (2.5 secondi)
    gateScreen.classList.add('fade-out');

    // Rivela l'invito bianco e inietta i glitter magici
    invScreen.classList.remove('hidden-init');
    spawnGlitter(35);

    setTimeout(() => {
      gateScreen.style.display = 'none';
    }, 2500);
  }

  // Eventi per intercettare tocchi e clic in modo istantaneo
  gateScreen.addEventListener('click', activateTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation();
      activateTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', activateTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activateTransition(); });

  // Apertura automatica temporizzata a 10 secondi
  const globalTimer = setTimeout(activateTransition, 10000);

})();
