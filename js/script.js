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
