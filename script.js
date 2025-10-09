function speakResume() {
  if ('speechSynthesis' in window) {
    const text = document.body.innerText.trim();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    speechSynthesis.speak(utter);
  }
}
// window.addEventListener('load', speakResume);

// Exibe o rodapé apenas ao final da rolagem
window.addEventListener('scroll', function () {
  const footer = document.getElementById('footer');
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    footer.classList.add('visible');
  } else {
    footer.classList.remove('visible');
  }
});
