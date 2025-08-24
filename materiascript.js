// script.js
// Troca de abas (trimestres) - nomes em português e comentários para facilitar a leitura

(function () {

  // Seleciona todos os botões de aba e todos os painéis
  const botoes = Array.from(document.querySelectorAll('.aba'));
  const paineis = Array.from(document.querySelectorAll('.painel'));

  // Garante que cada painel tem id no formato painel-1, painel-2, ...
  // (caso alguém edite o HTML depois)
  paineis.forEach((painel, indice) => {
    if (!/^painel-\d+$/.test(painel.id)) {
      painel.id = 'painel-' + (indice + 1);
    }
  });

  // Garante que cada botão tem data-aba (data-aba="1", "2", ...)
  botoes.forEach((btn, indice) => {
    if (!btn.dataset.aba) {
      btn.dataset.aba = String(indice + 1);
    }
    // Também define um id acessível para aria-labelledby se desejado
    if (!btn.id) {
      btn.id = 'aba-' + (indice + 1);
    }
  });

  // Função que ativa a aba número n (string ou número)
  function ativarAba(n) {
    const numero = String(n);

    // Atualiza atributo aria-selected em cada botão
    botoes.forEach(btn => {
      const selecionado = btn.dataset.aba === numero;
      btn.setAttribute('aria-selected', selecionado ? 'true' : 'false');
    });

    // Mostra o painel correspondente e esconde os outros
    paineis.forEach(p => {
      if (p.id === 'painel-' + numero) {
        p.classList.add('ativa');
      } else {
        p.classList.remove('ativa');
      }
    });
  }

  // Clique nos botões para trocar de aba
  botoes.forEach(btn => {
    btn.addEventListener('click', function () {
      const valor = this.dataset.aba;
      ativarAba(valor);
    });
  });

  // Suporte por teclado:
  // - Teclas '1', '2', '3', ... ativam as abas correspondentes
  // - Seta esquerda/direita ciclam entre as abas
  document.addEventListener('keydown', function (e) {
    const key = e.key;

    // ativar por número
    if (key >= '1' && key <= String(botoes.length)) {
      const idx = parseInt(key, 10) - 1;
      botoes[idx].click();
      return;
    }

    // ciclar com setas
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const atual = botoes.findIndex(b => b.getAttribute('aria-selected') === 'true');
      if (atual === -1) return;
      let proximo = atual + (key === 'ArrowRight' ? 1 : -1);
      if (proximo < 0) proximo = botoes.length - 1;
      if (proximo >= botoes.length) proximo = 0;
      botoes[proximo].click();
    }
  });

  // Inicialização: se houver um botão marcado aria-selected="true" ele será usado,
  // caso contrário ativamos a primeira aba por padrão.
  const inicial = botoes.find(b => b.getAttribute('aria-selected') === 'true') || botoes[0];
  if (inicial) inicial.click();

})();
