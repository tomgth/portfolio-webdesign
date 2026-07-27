"use strict";
const menuBtn=document.querySelector(".menu-btn");
const mobileNav=document.querySelector(".mobile-nav");
menuBtn?.addEventListener("click",()=>{
  const open=mobileNav.style.display==="flex";
  mobileNav.style.display=open?"none":"flex";
  menuBtn.textContent=open?"☰":"✕";
});
document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{
  mobileNav.style.display="none";
  if(menuBtn) menuBtn.textContent="☰";
}));
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

document.querySelector("#contact-form")?.addEventListener("submit",e=>{
  e.preventDefault();
  const s=document.querySelector("#status");
  if(s)s.textContent="Formulaire de démonstration : aucune donnée n’est encore envoyée.";
});
