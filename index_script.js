(function () {
  const raiz = document.getElementById('carrossel-fotos');
  if (!raiz) return;

  const faixa = raiz.querySelector('.faixa-fotos');
  const itens = Array.from(raiz.querySelectorAll('.item-foto'));
  const btnAnterior = raiz.querySelector('.botao.anterior');
  const btnProximo  = raiz.querySelector('.botao.proximo');
  const indicadores = raiz.querySelector('.indicadores');

  let indiceAtual = 0;
  const total = itens.length;

  // cria indicadores com base na quantidade de fotos
  itens.forEach((_, i) => {
    const ponto = document.createElement('button');
    ponto.type = 'button';
    ponto.className = 'ponto';
    ponto.setAttribute('aria-label', `Ir para foto ${i + 1}`);
    ponto.addEventListener('click', () => irPara(i));
    indicadores.appendChild(ponto);
  });

  function atualizarIndicadores() {
    const pontos = Array.from(indicadores.children);
    pontos.forEach((p, i) => p.classList.toggle('ativo', i === indiceAtual));
  }

  function irPara(novoIndice) {
    indiceAtual = (novoIndice + total) % total; // efeito circular
    const deslocamento = -indiceAtual * 100;   // em porcentagem
    faixa.style.transform = `translateX(${deslocamento}%)`;
    atualizarIndicadores();
  }

  function proximo() { irPara(indiceAtual + 1); }
  function anterior() { irPara(indiceAtual - 1); }

  btnProximo.addEventListener('click', proximo);
  btnAnterior.addEventListener('click', anterior);

  // teclado: setas esquerda/direita
  raiz.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') proximo();
    if (e.key === 'ArrowLeft')  anterior();
  });
  raiz.tabIndex = 0; // permite foco para teclado

  // toque: gesto simples de arrastar (mobile)
  let inicioX = null;
  raiz.addEventListener('touchstart', (e) => {
    inicioX = e.touches[0].clientX;
  }, { passive: true });

  raiz.addEventListener('touchend', (e) => {
    if (inicioX === null) return;
    const fimX = e.changedTouches[0].clientX;
    const delta = fimX - inicioX;
    const limiar = 30; // px
    if (delta > limiar) anterior();
    if (delta < -limiar) proximo();
    inicioX = null;
  });

  // inicializa
  irPara(0);
})();
