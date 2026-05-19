(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  const glitterContainer = document.getElementById('magic-glitter-container');
  let isTriggered = false;

  // GENERATORE DI POLVERE DI STELLE DORATA FLUTTUANTE SUL BACKGROUND
  function initGlitterShower(amount = 40) {
    for (let i = 0; i < amount; i++) {
      const glitter = document.createElement('div');
      glitter.classList.add('glitter-particle');
      
      const diameter = Math.random() * 4 + 3; // Dimensione ottimale visibile sui telefoni
      glitter.style.width = `${diameter}px`;
      glitter.style.height = `${diameter}px`;
      glitter.style.left = `${Math.random() * 100}vw`;
      
      glitter.style.animationDelay = `${Math.random() * 5}s`;
      glitter.style.animationDuration = `${Math.random() * 5 + 6}s`;
      
      glitterContainer.appendChild(glitter);
    }
  }

  function handleTransition() {
    if (isTriggered) return;
    isTriggered = true;

    clearTimeout(globalTimer);

    // Attiva la dissolvenza nebbiosa originale della Porta di Moria
    gateScreen.classList.add('fade-out');

    // Mostra l'invito e inietta i glitter dorati nel background satinato
    invScreen.classList.remove('hidden-init');
    initGlitterShower(40);

    // Smonta la schermata iniziale al termine della transizione (2.5 secondi)
    setTimeout(() => {
      gateScreen.style.display = 'none';
    }, 2500);
  }

  // Eventi pronti e reattivi per PC e mobile
  gateScreen.addEventListener('click', handleTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation();
      handleTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', handleTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handleTransition(); });

  // Auto-apertura di emergenza a 10 secondi
  const globalTimer = setTimeout(handleTransition, 10000);

})();
