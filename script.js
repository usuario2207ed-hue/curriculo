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


(function() {
  const fileDock = document.getElementById('fileDock');
  const dockHandle = document.getElementById('dockHandle');
  const dockContent = document.getElementById('dockContent');
  const fileItems = document.querySelectorAll('.file-item');

  let isDragging = false;
  let startX = 0, startY = 0;
  let origX = 0, origY = 0;

  const onPointerDown = (e) => {
    isDragging = true;
    fileDock.style.cursor = 'grabbing';
    startX = e.clientX || e.touches && e.touches[0].clientX;
    startY = e.clientY || e.touches && e.touches[0].clientY;
    const rect = fileDock.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;

    e.preventDefault();
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || e.touches && e.touches[0].clientX;
    const clientY = e.clientY || e.touches && e.touches[0].clientY;
    const dx = clientX - startX;
    const dy = clientY - startY;
    fileDock.style.left = Math.max(8, origX + dx) + 'px';
    fileDock.style.top = Math.max(8, origY + dy) + 'px';
  };

  const onPointerUp = (e) => {
    isDragging = false;
    fileDock.style.cursor = 'grab';
  };


  dockHandle.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);


  dockHandle.addEventListener('touchstart', onPointerDown, {passive: false});
  window.addEventListener('touchmove', onPointerMove, {passive: false});
  window.addEventListener('touchend', onPointerUp);


  dockHandle.addEventListener('click', (e) => {
    
    const expanded = dockContent.getAttribute('aria-hidden') === 'false';
    if (expanded) {
      dockContent.style.maxHeight = '0';
      dockContent.style.padding = '0';
      dockContent.setAttribute('aria-hidden', 'true');
    } else {
      dockContent.style.maxHeight = '520px';
      dockContent.style.padding = '12px';
      dockContent.setAttribute('aria-hidden', 'false');
    }
  });

 
  const fileViewerOverlay = document.getElementById('fileViewerOverlay');
  const fileViewerBody = document.getElementById('fileViewerBody');
  const closeFileViewer = document.getElementById('closeFileViewer');

  function showFileViewerElement(element) {
    fileViewerBody.innerHTML = '';
    fileViewerBody.appendChild(element);
    fileViewerOverlay.classList.add('show');
    fileViewerOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeViewer() {
   
    const v = fileViewerBody.querySelector('video');
    if (v && !v.paused) {
      try { v.pause(); } catch (e) {}
    }
    fileViewerOverlay.classList.remove('show');
    fileViewerOverlay.setAttribute('aria-hidden', 'true');
    fileViewerBody.innerHTML = '';
  }

  closeFileViewer.addEventListener('click', closeViewer);
  fileViewerOverlay.addEventListener('click', (e) => {
    if (e.target === fileViewerOverlay) closeViewer();
  });


  function simplifiedName(fullname) {
    return fullname.replace(/\.[^/.]+$/, "");
  }

 
  fileItems.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const fname = btn.getAttribute('data-file');
      if (!fname) return;
      const lower = fname.toLowerCase();

     
      if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.gif')) {
        const img = document.createElement('img');
        img.src = fname;
        img.alt = simplifiedName(fname);
        showFileViewerElement(img);
        return;
      }

     
      if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg')) {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.src = fname;
        video.setAttribute('playsinline', '');
        showFileViewerElement(video);
        return;
      }

     
      try {
        const win = window.open(fname, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=1000,height=700');
        if (!win) {
          
          window.location.href = fname;
        }
      } catch (err) {
        window.location.href = fname;
      }
    });


    const full = btn.getAttribute('title') || btn.textContent;
    btn.setAttribute('aria-label', full);
  });

  
  window.addEventListener('load', () => {
    const rect = fileDock.getBoundingClientRect();
    const maxLeft = window.innerWidth - rect.width - 8;
    const maxTop = window.innerHeight - rect.height - 8;
    if (rect.left > maxLeft) fileDock.style.left = `${maxLeft}px`;
    if (rect.top > maxTop) fileDock.style.top = `${8}px`;
  });

})();
