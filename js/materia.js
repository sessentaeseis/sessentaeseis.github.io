(function () {

  const botoes = Array.from(document.querySelectorAll('.aba'));
  const paineis = Array.from(document.querySelectorAll('.painel'));

  paineis.forEach((painel, indice) => {
    if (!/^painel-\d+$/.test(painel.id)) {
      painel.id = 'painel-' + (indice + 1);
    }
  });

  
  botoes.forEach((btn, indice) => {
    if (!btn.dataset.aba) {
      btn.dataset.aba = String(indice + 1);
    }
    if (!btn.id) {
      btn.id = 'aba-' + (indice + 1);
    }
  });

  function ativarAba(n) {
    const numero = String(n);

    botoes.forEach(btn => {
      const selecionado = btn.dataset.aba === numero;
      btn.setAttribute('aria-selected', selecionado ? 'true' : 'false');
    });

    paineis.forEach(p => {
      if (p.id === 'painel-' + numero) {
        p.classList.add('ativa');
      } else {
        p.classList.remove('ativa');
      }
    });
  }

  
  botoes.forEach(btn => {
    btn.addEventListener('click', function () {
      const valor = this.dataset.aba;
      ativarAba(valor);
    });
  });

  document.querySelectorAll('.atividade-fotos').forEach(carrossel => {
    const fotos = Array.from(carrossel.querySelectorAll('.atividade-foto'));
    let atual = 0;

    function mostrarFoto(indice) {
      atual = (indice + fotos.length) % fotos.length;
      fotos.forEach((foto, fotoIndice) => {
        foto.classList.toggle('ativa', fotoIndice === atual);
      });
    }

    function trocarFoto(direcao, evento) {
      evento.preventDefault();
      evento.stopPropagation();
      mostrarFoto(atual + direcao);
    }

    carrossel.querySelector('.foto-anterior').addEventListener('click', evento => trocarFoto(-1, evento));
    carrossel.querySelector('.foto-proxima').addEventListener('click', evento => trocarFoto(1, evento));
    carrossel.querySelectorAll('[role="button"]').forEach(controle => {
      controle.addEventListener('keydown', evento => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault();
          controle.click();
        }
      });
    });
  });

  document.addEventListener('keydown', function (e) {
    const key = e.key;

    // ativar por número
    if (key >= '1' && key <= String(botoes.length)) {
      const idx = parseInt(key, 10) - 1;
      botoes[idx].click();
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const atual = botoes.findIndex(b => b.getAttribute('aria-selected') === 'true');
      if (atual === -1) return;
      let proximo = atual + (key === 'ArrowRight' ? 1 : -1);
      if (proximo < 0) proximo = botoes.length - 1;
      if (proximo >= botoes.length) proximo = 0;
      botoes[proximo].click();
    }
  });

  const inicial = botoes.find(b => b.getAttribute('aria-selected') === 'true') || botoes[0];
  if (inicial) inicial.click();

})();
