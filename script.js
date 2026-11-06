const sections = [...document.querySelectorAll('.section')];
const pageIndicator = document.querySelector('.nav-right');

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting || !pageIndicator) continue;
    pageIndicator.textContent = `${entry.target.id} / 09`;
  }
}, { threshold: 0.48 });

sections.forEach((section) => sectionObserver.observe(section));

const rail = document.querySelector('.archive-rail');

if (rail) {
  let drag = null;

  rail.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch' || event.button !== 0) return;
    drag = { pointerId: event.pointerId, x: event.clientX, scrollLeft: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
  });

  rail.addEventListener('pointermove', (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    rail.scrollLeft = drag.scrollLeft - (event.clientX - drag.x) * 1.15;
  });

  const endDrag = (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    drag = null;
  };

  rail.addEventListener('pointerup', endDrag);
  rail.addEventListener('pointercancel', endDrag);
  rail.addEventListener('lostpointercapture', () => { drag = null; });
}

const openButton = document.getElementById('openLetter');
const closeButton = document.getElementById('closeLetter');
const note = document.getElementById('note');

if (openButton && closeButton && note) {
  const setNoteOpen = (isOpen) => {
    note.hidden = !isOpen;
    note.classList.toggle('open', isOpen);
    openButton.hidden = isOpen;
    openButton.setAttribute('aria-expanded', String(isOpen));
    (isOpen ? closeButton : openButton).focus();
  };

  openButton.addEventListener('click', () => setNoteOpen(true));
  closeButton.addEventListener('click', () => setNoteOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !note.hidden) {
      setNoteOpen(false);
    }
  });
}
