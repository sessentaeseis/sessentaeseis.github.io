// Carrossel de Certificados
let certSlideIndex = 1;
showCertSlides(certSlideIndex);

function plusCertSlides(n) {
  showCertSlides(certSlideIndex += n);
}

function showCertSlides(n) {
  let i;
  let slides = document.getElementsByClassName("cert-slides");
  if (n > slides.length) {certSlideIndex = 1}
  if (n < 1) {certSlideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[certSlideIndex-1].style.display = "block";
}

// Carrossel de Fotos
let fotoSlideIndex = 1;
showFotoSlides(fotoSlideIndex);

function plusFotoSlides(n) {
  showFotoSlides(fotoSlideIndex += n);
}

function showFotoSlides(n) {
  let i;
  let slides = document.getElementsByClassName("foto-slides");
  if (n > slides.length) {fotoSlideIndex = 1}
  if (n < 1) {fotoSlideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[fotoSlideIndex-1].style.display = "block";
}
