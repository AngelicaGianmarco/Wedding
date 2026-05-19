(function () {
  'use strict';

  const gateScreen = document.getElementById('gate-screen');
  const gateImg    = document.getElementById('gate-trigger');
  const invScreen  = document.getElementById('invitation-screen');
  const particlesContainer = document.getElementById('particles-container');
  let hasTriggered = false;

  // GENERATORE AUTOMATICO DI POLVERE DI STELLE ELFICA (Senza file esterni!)
  function spawnParticles(count = 20) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      
      const size = Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}vw`;
      p.style.animationDelay = `${Math.random() * 7}s`;
      p.style.animationDuration = `${Math.random() * 5 + 6}s`;
      
      particlesContainer.appendChild(p);
    }
  }

  function activateTransition() {
    if (hasTriggered) return;
    hasTriggered = true;
    
    clearTimeout(globalTimer);

    // Avvia la dissolvenza lenta e fumosa regolata nel CSS
    gateScreen.classList.add('fade-out');

    // Sblocca immediatamente l'invito sotto mentre la nebbia sparisce
    invScreen.classList.remove('hidden-init');
    spawnParticles(25); // Fa sbucare le lucciole magiche sul fondo dell'invito

    // Rimuove fisicamente lo schermo protettivo dopo che la sfumatura è completa
    setTimeout(() => {
      gateScreen.style.display = 'none';
    }, 2000);
  }

  // Intercettazione immediata tocco/clic su tutto lo schermo iniziale
  gateScreen.addEventListener('click', activateTransition);
  if (gateImg) {
    gateImg.addEventListener('click', function(e) {
      e.stopPropagation();
      activateTransition();
    });
  }
  
  gateScreen.addEventListener('touchstart', activateTransition, { passive: true });
  gateScreen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activateTransition(); });

  // Apertura automatica di emergenza a 10 secondi
  const globalTimer = setTimeout(activateTransition, 10000);

})();
