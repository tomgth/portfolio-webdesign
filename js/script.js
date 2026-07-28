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


// V16 cinematic homepage entrance + progressive premium effects.
(() => {
  const body = document.body;
  const intro = document.querySelector(".cinematic-intro");
  const pct = document.querySelector(".intro-percent");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finishIntro = () => {
    body.classList.remove("intro-lock");
    body.classList.add("intro-complete");
    intro?.classList.add("is-done");
  };

  if (body.classList.contains("home-page")) {
    if (prefersReduced || !intro) {
      finishIntro();
    } else {
      let n = 0;
      const timer = setInterval(() => {
        n = Math.min(100, n + Math.ceil((100 - n) * .13) + 1);
        if (pct) pct.textContent = String(n).padStart(2, "0");
        if (n >= 100) clearInterval(timer);
      }, 38);
      window.addEventListener("load", () => setTimeout(finishIntro, 2500), {once:true});
      // Never trap the visitor if an asset stalls.
      setTimeout(finishIntro, 3300);
    }
  }

  if (!prefersReduced && matchMedia("(pointer:fine)").matches) {
    const deviceStage = document.querySelector(".device-stage");
    deviceStage?.addEventListener("pointermove", e => {
      const r = deviceStage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      deviceStage.style.transform = `perspective(1000px) rotateX(${-y*2.2}deg) rotateY(${x*2.8}deg)`;
    });
    deviceStage?.addEventListener("pointerleave", () => deviceStage.style.transform = "");

    document.querySelectorAll(".sector-card").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--sx", `${((e.clientX-r.left)/r.width)*100}%`);
        card.style.setProperty("--sy", `${((e.clientY-r.top)/r.height)*100}%`);
      });
    });
  }

  // Rotate the visual responsive labels as a tiny passive demo.
  const tabs = [...document.querySelectorAll(".device-tabs span")];
  if (tabs.length && !prefersReduced) {
    let current = 0;
    setInterval(() => {
      tabs[current].classList.remove("active");
      current = (current + 1) % tabs.length;
      tabs[current].classList.add("active");
    }, 2200);
  }

  // Internal navigation gets a short premium fade without delaying external links.
  document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(link => {
    link.addEventListener("click", e => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || link.target === "_blank" || prefersReduced) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      body.classList.add("page-leaving");
      setTimeout(() => location.href = link.href, 220);
    });
  });
})();


// V17 CLEAN — hero device entrance and illuminated custom cursor.
(() => {
  const body = document.body;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (body.classList.contains("home-page")) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      body.classList.remove("device-intro-loading");
      body.classList.add("device-intro-complete");
    }));
  }

  if (!reduced && window.matchMedia("(pointer:fine)").matches) {
    const cursor = document.querySelector(".premium-cursor");
    const dot = cursor?.querySelector(".cursor-dot");
    const ring = cursor?.querySelector(".cursor-ring");
    const glow = cursor?.querySelector(".cursor-glow");
    if (!cursor || !dot || !ring || !glow) return;

    let mx = innerWidth/2, my = innerHeight/2;
    let rx = mx, ry = my, gx = mx, gy = my;

    window.addEventListener("pointermove", e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      document.documentElement.classList.remove("cursor-hidden");
    }, {passive:true});

    const loop = () => {
      rx += (mx-rx)*.21; ry += (my-ry)*.21;
      gx += (mx-gx)*.075; gy += (my-gy)*.075;
      ring.style.left = rx+"px"; ring.style.top = ry+"px";
      glow.style.left = gx+"px"; glow.style.top = gy+"px";
      requestAnimationFrame(loop);
    };
    loop();

    const interactive = "a,button,summary,.project-card,.service,.sector-card,.offer,.feature-chips span";
    document.querySelectorAll(interactive).forEach(el => {
      el.addEventListener("pointerenter", () => document.documentElement.classList.add("cursor-active"));
      el.addEventListener("pointerleave", () => document.documentElement.classList.remove("cursor-active"));
    });

    document.documentElement.addEventListener("mouseleave", () => document.documentElement.classList.add("cursor-hidden"));
    document.documentElement.addEventListener("mouseenter", () => document.documentElement.classList.remove("cursor-hidden"));
  }
})();
