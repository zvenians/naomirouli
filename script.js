const scenes=[...document.querySelectorAll('.scene')];
const progress=document.querySelector('.progress span');
const page=document.querySelector('#page');
const side=[...document.querySelectorAll('.side-index span')];
const loader=document.querySelector('.loader');
addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),500));
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%'}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const n=e.target.dataset.scene;page.textContent=`${n} / 09`;side.forEach((s,i)=>s.classList.toggle('active',String(i+1).padStart(2,'0')===n));e.target.classList.add('is-visible')}),{threshold:.48});
scenes.forEach(s=>io.observe(s));
const rail=document.querySelector('.archive-rail');let dragging=false,startX=0,startScroll=0;
rail.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;dragging=true;startX=e.clientX;startScroll=rail.scrollLeft;rail.setPointerCapture(e.pointerId)});
rail.addEventListener('pointermove',e=>{if(dragging)rail.scrollLeft=startScroll-(e.clientX-startX)*1.15});
['pointerup','pointercancel','pointerleave'].forEach(x=>rail.addEventListener(x,e=>{dragging=false;try{rail.releasePointerCapture(e.pointerId)}catch{}}));
const letter=document.querySelector('.letter');
const open=document.querySelector('#openLetter');
const close=document.querySelector('#closeLetter');
open.addEventListener('click',()=>{letter.classList.add('open');setTimeout(()=>close.focus(),500)});
close.addEventListener('click',()=>letter.classList.remove('open'));
