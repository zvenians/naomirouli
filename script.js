const sections = [...document.querySelectorAll('.section')];
const page = document.querySelector('.nav-right');

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const n = e.target.id;
    if(n && page) page.textContent = `${n} / 09`;
  });
}, { threshold: 0.48 });

sections.forEach(s => io.observe(s));

const rail = document.querySelector('.archive-rail');
let dragging = false, startX = 0, startScroll = 0;

if (rail) {
  rail.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;
    dragging = true;
    startX = e.clientX;
    startScroll = rail.scrollLeft;
    rail.setPointerCapture(e.pointerId);
  });
  rail.addEventListener('pointermove', e => {
    if (dragging) rail.scrollLeft = startScroll - (e.clientX - startX) * 1.15;
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(x => {
    rail.addEventListener(x, e => {
      dragging = false;
      try { rail.releasePointerCapture(e.pointerId); } catch {}
    });
  });
}

const letterStage = document.getElementById('letterStage');
const openBtn = document.getElementById('openLetter');
const closeBtn = document.getElementById('closeLetter');
const note = document.getElementById('note');

if (openBtn && closeBtn && note) {
  openBtn.addEventListener('click', () => {
    openBtn.style.display = 'none';
    note.classList.add('open');
  });
  
  closeBtn.addEventListener('click', () => {
    note.classList.remove('open');
    openBtn.style.display = 'inline-block';
  });
}
