window.addEventListener('load', () => {
  const popup = document.getElementById('popup');
  const btnCurriculo = document.getElementById('btnCurriculo');
  const btnDownload = document.getElementById('btnDownload');
  const SEEN_POPUP_KEY = 'popupShown';

  const hasSeenPopup = localStorage.getItem(SEEN_POPUP_KEY);
  if (!hasSeenPopup) {
    popup.style.display = 'flex';
  }

  btnCurriculo.addEventListener('click', () => {
    popup.style.display = 'none';
    localStorage.setItem(SEEN_POPUP_KEY, 'true');
  });

  btnDownload.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'Edmilson_Charif_Tecnico_de_Producao.pdf';
    link.download = 'Edmilson_Charif_Tecnico_de_Producao.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  window.addEventListener('scroll', () => {
    const footer = document.getElementById('footer');
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
      footer.classList.add('visible');
    } else {
      footer.classList.remove('visible');
    }
  });
});
