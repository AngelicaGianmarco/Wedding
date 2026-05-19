(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  const glitterContainer = document.getElementById('magic-glitter-container');
  let isTriggered = false;

  // GENERATORE AUTOMATICO DI GLITTER FLUTTUANTI CONTINUI SUL BACKGROUND SATINATO
  function initGlitterShower(amount = 35) {
    for (let i = 0; i < amount; i++) {
      const glitter = document.createElement('div');
      glitter.classList.add('glitter-particle');
      
      const diameter = Math.random() * 4 + 3; // Dimensioni visibili e armoniche
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

    // Attiva la transizione fumosa lenta a sfumare regolata nel CSS
    gateScreen.classList.add('fade-out');

    // Rivela istantaneamente l'invito sottostante e inietta la polvere di stelle
    invScreen.classList.remove('hidden-init');
    initGlitterShower(35);

    // Smonta fisicamente lo schermo protettivo dopo che la sfumatura si è completata
    setTimeout(() => {
      gateScreen.style.display = 'none';
    }, 2500);
  }

  // Intercettori di interazione istantanea
  gateScreen.addEventListener('click', handleTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation();
      handleTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', handleTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handleTransition(); });

  // Apertura automatica di emergenza temporizzata a 10 secondi
  const globalTimer = setTimeout(handleTransition, 10000);

})();
