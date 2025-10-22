function speakResume() {
  if ('speechSynthesis' in window) {
    const text = document.body.innerText.trim();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    speechSynthesis.speak(utter);
  }
}

window.addEventListener('scroll', function () {
  const footer = document.getElementById('footer');
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    footer.classList.add('visible');
  } else {
    footer.classList.remove('visible');
  }
});

window.addEventListener('load', () => {
  const popup = document.getElementById('popup');
  const btnCurriculo = document.getElementById('btnCurriculo');
  popup.style.display = 'flex';
  btnCurriculo.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  const NOTIF_KEY = 'lastNotification';
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const last = localStorage.getItem(NOTIF_KEY);

  function showNotification() {
    if (Notification.permission === 'granted') {
      new Notification('Mensagem de Edmilson', {
        body: 'Olá tudo bem? Só passando para desejar um ótimo dia! Lembrando que estou à disposição. Abraço!',
        icon: 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png'
      });
      localStorage.setItem(NOTIF_KEY, now);
    }
  }

  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') showNotification();
    });
  } else if (Notification.permission === 'granted') {
    if (!last || now - last > THIRTY_DAYS) {
      showNotification();
    }
  }

  const DOWNLOAD_KEY = 'pdfDownloaded';
  if (!localStorage.getItem(DOWNLOAD_KEY)) {
    const link = document.createElement('a');
    link.href = 'Edmilson_Charif_Tecnico_de_Produção.pdf';
    link.download = 'Edmilson_Charif_Tecnico_de_Produção.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    localStorage.setItem(DOWNLOAD_KEY, 'true');
  }
});
