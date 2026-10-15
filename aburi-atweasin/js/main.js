// Mobile menu
const toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('nav');
toggle.addEventListener('click',()=>{const o=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',o)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded',false)}));

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Counters
const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;co.unobserve(e.target);
  const el=e.target,end=+el.dataset.count,suf=el.dataset.suffix||'',t0=performance.now(),dur=1600;
  (function tick(t){const p=Math.min((t-t0)/dur,1),v=Math.round(end*(1-Math.pow(1-p,3)));el.textContent=v+suf;if(p<1)requestAnimationFrame(tick)})(t0);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

// Active nav link
const links=[...nav.querySelectorAll('a:not(.btn)')];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
links.forEach(l=>{const s=document.querySelector(l.getAttribute('href'));if(s)so.observe(s)});

// Back to top
const tt=document.getElementById('toTop');
addEventListener('scroll',()=>tt.classList.toggle('show',scrollY>600));
tt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

// Contact form -> opens email client (no backend needed). Change the address below.
const EMAIL='info@example.org';
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();const f=new FormData(e.target);
  const body=`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nInterested in: ${f.get('topic')}\n\n${f.get('message')}`;
  location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Website enquiry: '+f.get('topic'))}&body=${encodeURIComponent(body)}`;
  document.getElementById('formNote').textContent='Thank you! Your email app should open to send your message.';
});
document.getElementById('year').textContent=new Date().getFullYear();

// Gallery lightbox
const figs=[...document.querySelectorAll('.masonry figure')],lb=document.getElementById('lightbox'),lbImg=lb.querySelector('img'),lbCap=lb.querySelector('p');let cur=0;
function show(i){cur=(i+figs.length)%figs.length;const im=figs[cur].querySelector('img');lbImg.src=im.src;lbImg.alt=im.alt;lbCap.textContent=figs[cur].querySelector('figcaption').textContent;lb.classList.add('open');lb.setAttribute('aria-hidden','false')}
function hide(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true')}
figs.forEach((f,i)=>f.addEventListener('click',()=>show(i)));
lb.querySelector('.lb-close').onclick=hide;lb.querySelector('.prev').onclick=()=>show(cur-1);lb.querySelector('.next').onclick=()=>show(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)hide()});
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')hide();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
