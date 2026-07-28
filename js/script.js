"use strict";

const header=document.querySelector(".header");
const menuBtn=document.querySelector(".menu-btn");
const mobileNav=document.querySelector(".mobile-nav");

const syncHeader=()=>header?.classList.toggle("scrolled",window.scrollY>18);
syncHeader();
window.addEventListener("scroll",syncHeader,{passive:true});

menuBtn?.addEventListener("click",()=>{
  const open=mobileNav?.classList.toggle("open");
  if(mobileNav) mobileNav.style.display=open?"flex":"none";
  menuBtn.textContent=open?"✕":"☰";
  menuBtn.setAttribute("aria-expanded",String(Boolean(open)));
});

document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{
  mobileNav?.classList.remove("open");
  if(mobileNav) mobileNav.style.display="none";
  if(menuBtn){menuBtn.textContent="☰";menuBtn.setAttribute("aria-expanded","false");}
}));

if("IntersectionObserver" in window){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },{threshold:.08,rootMargin:"0px 0px -24px"});
  document.querySelectorAll(".reveal,.process-line").forEach(el=>io.observe(el));
}else{
  document.querySelectorAll(".reveal,.process-line").forEach(el=>el.classList.add("visible"));
}

document.querySelector("#contact-form")?.addEventListener("submit",e=>{
  e.preventDefault();
  const s=document.querySelector("#status");
  if(s)s.textContent="Formulaire de démonstration : aucune donnée n’est encore envoyée.";
});

// Older versions contained decorative hero arrows. Remove them if stale markup is ever reintroduced.
document.querySelectorAll(
  ".hero-showcase .arrow,.hero-showcase .scroll,.hero-showcase .scroll-down,"+
  ".hero-showcase .scroll-indicator,.hero .hero-arrow,.hero .scroll-indicator,.hero .scroll-down"
).forEach(el=>el.remove());

// V15 premium motion
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const root=document.documentElement;const updateProgress=()=>{const m=document.documentElement.scrollHeight-innerHeight;root.style.setProperty("--scroll-progress",`${m>0?scrollY/m*100:0}%`)};updateProgress();addEventListener("scroll",updateProgress,{passive:true});if(!reduceMotion&&matchMedia("(pointer:fine)").matches){addEventListener("pointermove",e=>{root.style.setProperty("--mx",`${e.clientX}px`);root.style.setProperty("--my",`${e.clientY}px`)},{passive:true});document.querySelectorAll(".project-card").forEach(c=>{c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty("--card-x",`${x*100}%`);c.style.setProperty("--card-y",`${y*100}%`);c.style.transform=`perspective(900px) rotateX(${(.5-y)*3}deg) rotateY(${(x-.5)*4}deg) translateY(-7px)`});c.addEventListener("pointerleave",()=>c.style.transform="")});const h=document.querySelector(".hero-showcase");document.querySelector(".hero")?.addEventListener("pointermove",e=>{if(!h)return;const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;h.style.transform=`translate3d(${x*8}px,${y*5}px,0)`});document.querySelector(".hero")?.addEventListener("pointerleave",()=>{if(h)h.style.transform=""});document.querySelectorAll(".magnetic").forEach(b=>{b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`});b.addEventListener("pointerleave",()=>b.style.transform="")})}
