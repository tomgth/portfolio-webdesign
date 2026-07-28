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


// V18 FINAL — cursor automatically injected on every page.
(() => {
  const fine = window.matchMedia("(pointer:fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced) return;

  // Remove old cursor markup from previous versions if present.
  document.querySelectorAll(".premium-cursor,.site-cursor-v18").forEach(el => el.remove());
  document.documentElement.classList.remove("cursor-active","cursor-hidden");

  const cursor = document.createElement("div");
  cursor.className = "site-cursor-v18";
  cursor.setAttribute("aria-hidden","true");
  cursor.innerHTML = '<span class="cursor-halo-v18"></span><span class="cursor-trail-v18"></span><span class="cursor-core-v18"></span>';
  document.body.appendChild(cursor);

  const core = cursor.querySelector(".cursor-core-v18");
  const trail = cursor.querySelector(".cursor-trail-v18");
  const halo = cursor.querySelector(".cursor-halo-v18");

  let mx=innerWidth/2,my=innerHeight/2,tx=mx,ty=my,hx=mx,hy=my,oldX=mx,oldY=my;
  const pos=(el,x,y)=>{el.style.left=x+"px";el.style.top=y+"px"};

  addEventListener("pointermove",e=>{
    oldX=mx;oldY=my;mx=e.clientX;my=e.clientY;
    pos(core,mx,my);
    const angle=Math.atan2(my-oldY,mx-oldX)*180/Math.PI;
    trail.style.transform=`translate(-100%,-50%) rotate(${angle}deg)`;
    cursor.classList.add("is-visible");
  },{passive:true});

  const loop=()=>{
    tx+=(mx-tx)*.24;ty+=(my-ty)*.24;
    hx+=(mx-hx)*.075;hy+=(my-hy)*.075;
    pos(trail,tx,ty);pos(halo,hx,hy);
    requestAnimationFrame(loop);
  };
  loop();

  const selector="a,button,summary,.project-card,.service,.sector-card,.offer,.feature-chips span,.faq-list details";
  document.addEventListener("pointerover",e=>{
    if(e.target.closest(selector)) cursor.classList.add("cursor-hover-v18");
  },{passive:true});
  document.addEventListener("pointerout",e=>{
    if(e.target.closest(selector) && !e.relatedTarget?.closest?.(selector)) cursor.classList.remove("cursor-hover-v18");
  },{passive:true});

  document.documentElement.addEventListener("mouseleave",()=>cursor.classList.remove("is-visible"));
  document.documentElement.addEventListener("mouseenter",()=>cursor.classList.add("is-visible"));
})();


// V19 — one direct cursor element on every page.
(() => {
  const fine = window.matchMedia("(pointer:fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced) return;

  // Remove every previous cursor implementation.
  document.querySelectorAll(".premium-cursor,.site-cursor-v18,.site-cursor-v19").forEach(el => el.remove());

  const cursor = document.createElement("div");
  cursor.className = "site-cursor-v19";
  cursor.setAttribute("aria-hidden","true");
  document.body.appendChild(cursor);

  const move = (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor.classList.add("is-visible");
  };
  window.addEventListener("pointermove", move, {passive:true});

  const interactive = "a,button,summary,.project-card,.service,.sector-card,.offer,.feature-chips span,.faq-list details";
  document.addEventListener("pointerover", e => {
    if (e.target.closest(interactive)) cursor.classList.add("is-hovering");
  }, {passive:true});
  document.addEventListener("pointerout", e => {
    if (e.target.closest(interactive) && !e.relatedTarget?.closest?.(interactive)) {
      cursor.classList.remove("is-hovering");
    }
  }, {passive:true});

  document.documentElement.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));
  document.documentElement.addEventListener("mouseenter", () => cursor.classList.add("is-visible"));
})();


// V20 — page and scroll-driven color identity.
(() => {
  const root = document.documentElement;
  const body = document.body;

  const themes = {
    violet:{accent:"#8b5cf6",accent2:"#c4b5fd",rgb:"139,92,246",deep:"#5b21b6"},
    blue:{accent:"#3b82f6",accent2:"#93c5fd",rgb:"59,130,246",deep:"#1d4ed8"},
    cyan:{accent:"#06b6d4",accent2:"#67e8f9",rgb:"6,182,212",deep:"#0e7490"},
    green:{accent:"#10b981",accent2:"#6ee7b7",rgb:"16,185,129",deep:"#047857"},
    warm:{accent:"#ef5b3c",accent2:"#f6ad7b",rgb:"239,91,60",deep:"#b83224"},
    amber:{accent:"#d6a15b",accent2:"#f5d7a1",rgb:"214,161,91",deep:"#9a6b2f"}
  };

  const applyTheme = (name) => {
    const t = themes[name] || themes.violet;
    root.style.setProperty("--accent",t.accent);
    root.style.setProperty("--accent-2",t.accent2);
    root.style.setProperty("--accent-rgb",t.rgb);
    root.style.setProperty("--accent-deep",t.deep);
    body.dataset.currentAccent = name;
  };

  // Subtle global ambient layer, shared across every page.
  if (!document.querySelector(".color-ambient-v20")) {
    const ambient = document.createElement("div");
    ambient.className = "color-ambient-v20";
    ambient.setAttribute("aria-hidden","true");
    body.prepend(ambient);
  }

  const path = location.pathname.toLowerCase();

  // Fixed identity by page.
  let pageTheme = "violet";
  if (path.includes("/projets/restaurant")) pageTheme = "warm";
  else if (path.includes("/projets/studio-digital")) pageTheme = "violet";
  else if (path.includes("/projets/architecture")) pageTheme = "amber";
  else if (path.endsWith("/services.html") || path.endsWith("services.html")) pageTheme = "blue";
  else if (path.endsWith("/projets.html") || path.endsWith("projets.html")) pageTheme = "warm";
  else if (path.endsWith("/tarifs.html") || path.endsWith("tarifs.html")) pageTheme = "green";
  else if (path.endsWith("/a-propos.html") || path.endsWith("a-propos.html")) pageTheme = "cyan";
  else if (path.endsWith("/lab.html") || path.endsWith("lab.html")) pageTheme = "blue";
  else if (path.endsWith("/contact.html") || path.endsWith("contact.html")) pageTheme = "violet";

  applyTheme(pageTheme);

  // Home page: accent evolves as sections enter the center of the viewport.
  const accentSections = [...document.querySelectorAll("[data-accent]")];
  if (accentSections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) {
        applyTheme(visible[0].target.dataset.accent || "violet");
      }
    },{
      root:null,
      rootMargin:"-28% 0px -38% 0px",
      threshold:[0,.2,.4,.6,.8,1]
    });
    accentSections.forEach(section => observer.observe(section));
  }

  // Project cards can temporarily preview their own color identity on hover.
  const projectThemeMap = [
    ['a[href*="restaurant"]',"warm"],
    ['a[href*="studio-digital"]',"violet"],
    ['a[href*="architecture"]',"amber"]
  ];
  projectThemeMap.forEach(([selector,theme]) => {
    document.querySelectorAll(selector).forEach(card => {
      let previous = null;
      card.addEventListener("pointerenter",() => {
        previous = body.dataset.currentAccent || pageTheme;
        applyTheme(theme);
      });
      card.addEventListener("pointerleave",() => {
        applyTheme(previous || pageTheme);
      });
    });
  });
})();


// V23 — homepage accent is intentionally fixed to violet.
(() => {
  if (!document.body.classList.contains("home-page")) return;
  const root = document.documentElement;
  const lockViolet = () => {
    root.style.setProperty("--accent","#8b5cf6");
    root.style.setProperty("--accent-2","#c4b5fd");
    root.style.setProperty("--accent-rgb","139,92,246");
    root.style.setProperty("--accent-deep","#5b21b6");
    document.body.dataset.currentAccent = "violet";
  };
  lockViolet();

  // V20 observers can fire later; enforce the homepage identity.
  const observer = new MutationObserver(lockViolet);
  observer.observe(document.documentElement,{attributes:true,attributeFilter:["style"]});
})();
