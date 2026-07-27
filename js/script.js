"use strict";
const header=document.querySelector(".header");
const menuBtn=document.querySelector(".menu-btn");
const mobileNav=document.querySelector(".mobile-nav");

addEventListener("scroll",()=>header?.classList.toggle("scrolled",scrollY>25),{passive:true});

menuBtn?.addEventListener("click",()=>{
  const open=mobileNav.style.display==="flex";
  mobileNav.style.display=open?"none":"flex";
  menuBtn.textContent=open?"☰":"✕";
  menuBtn.setAttribute("aria-expanded",String(!open));
});
document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{
  mobileNav.style.display="none"; if(menuBtn){menuBtn.textContent="☰";menuBtn.setAttribute("aria-expanded","false")}
}));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}
}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

if(matchMedia("(pointer:fine)").matches){
  const glow=document.createElement("div"); glow.className="cursor-glow"; document.body.appendChild(glow);
  addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
  const browser=document.querySelector(".browser"), stage=document.querySelector(".device-stage");
  stage?.addEventListener("mousemove",e=>{
    const r=stage.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/65,y=(r.height/2-(e.clientY-r.top))/85;
    browser.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;
  });
  stage?.addEventListener("mouseleave",()=>browser.style.transform="rotateY(-4deg) rotateX(2deg)");
}

// Contact form: demo only, prevents accidental fake submission until a backend is connected.
document.querySelector("#contact-form")?.addEventListener("submit",e=>{
  e.preventDefault();
  const box=document.querySelector("#form-status");
  if(box) box.textContent="Formulaire de démonstration : connecte-le ensuite à un service d'envoi sécurisé.";
});
