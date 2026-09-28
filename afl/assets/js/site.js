/* ============================================================
   AFL SNACK — by ArteFood
   Construit l'en-tête, le pied de page, la carte et les infos
   à partir de config.js. Rien à modifier ici pour changer un prix.
   ============================================================ */
(function(){
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const page = document.body.dataset.page || "";
  const telHref = "tel:" + SITE.tel.replace(/\s/g, "");
  const euro = p => `${p}&nbsp;€`;

  /* ---------- ICÔNES (traits fins) ---------- */
  const sv = (d, w = 1.5) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    burger:   sv('<path d="M4 10a8 5 0 0 1 16 0Z"/><path d="M3.5 13.5h17"/><path d="M4 17h16a0 0 0 0 1 0 0 3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z"/><path d="M9 7.5h.01M12 6.5h.01M15 7.5h.01"/>'),
    duo:      sv('<path d="M2 11a5.5 3.5 0 0 1 11 0Z"/><path d="M2 14h11M2.5 17h10a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2Z"/><path d="M11 8.6A5.5 3.5 0 0 1 22 11h-7.5M13 14h9M13.5 17h8a2 2 0 0 1-2 2h-6"/>'),
    sandwich: sv('<path d="M3 13c0-4 4-7 9-7s9 3 9 7"/><path d="M3 13h18l-1.5 4h-15Z"/><path d="M7 9.5l1 1M11 8l1 1M15 9l1 1"/>'),
    tacos:    sv('<path d="M3 17a9 9 0 0 1 18 0Z"/><path d="M6 13c1-1 2 0 3-1s2 0 3-1 2 0 3-1 2 0 3 1"/>'),
    fire:     sv('<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9Z"/>'),
    panini:   sv('<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M7 8l-2 8M11 8l-2 8M15 8l-2 8M19 8l-2 8"/>'),
    texmex:   sv('<path d="M12 3c-1 2-1 3 0 4"/><path d="M8 7h8l-1 13a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"/><path d="M5 7l3 0M16 7l3 0"/>'),
    enfant:   sv('<circle cx="12" cy="9" r="4.5"/><path d="M10.2 8.5h.01M13.8 8.5h.01M10.5 10.5c.8.7 2.2.7 3 0"/><path d="M5 21c.8-3.5 3.6-6 7-6s6.2 2.5 7 6"/><path d="M8.5 5.5c1-2 5.5-2.5 7 0"/>'),
    dessert:  sv('<path d="M5 11h14l-2 9H7Z"/><path d="M5 11a7 5 0 0 1 14 0"/><path d="M12 3v3"/>'),
    phone:    sv('<path d="M6 3h3l2 5-2 1.5a11 11 0 0 0 5.5 5.5L16 13l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2"/>'),
    pin:      sv('<path d="M12 21s-7-5.4-7-11a7 7 0 0 1 14 0c0 5.6-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/>'),
    clock:    sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>'),
    bike:     sv('<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-7h5l3 7M10 10 8.5 6H6M15 10l1.5-4H19"/>'),
    bag:      sv('<path d="M5 8h14l-1 12H6Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
    seat:     sv('<path d="M4 10h16M6 10v10M18 10v10M8 6h8v4H8Z"/>'),
    halal:    sv('<circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l2.5 2.5L16 9.5"/>'),
    mail:     sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    arrow:    sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    down:     sv('<path d="M7 10l5 5 5-5"/>'),
    menu:     sv('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close:    sv('<path d="M6 6l12 12M18 6 6 18"/>'),
    star:     '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.2l5.9-.9L12 3z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>',
    instagram:sv('<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'),
    uber:     sv('<path d="M5 6v7a5 5 0 0 0 10 0V6M19 6v12"/>'),
  };
  const flourish = `<div class="flourish">${IC.fire}</div>`;

  /* ---------- MARQUE (logo image si présent, sinon texte) ---------- */
  const brandText = `<span class="b-name">AFL</span><span class="b-over">Food · Snack</span>`;
  function brand(cls = ""){ return `<a href="index.html" class="brand ${cls}" aria-label="${SITE.nom} — accueil">${brandText}</a>`; }
  function useLogoIfAvailable(){
    if(!SITE.logo) return;
    const probe = new Image();
    probe.onload = () => $$(".brand").forEach(b => { b.classList.add("has-logo"); b.innerHTML = `<img src="${SITE.logo}" alt="${SITE.nom}">`; });
    probe.src = SITE.logo;
  }

  /* ---------- EN-TÊTE ---------- */
  function buildHeader(){
    const host = $("#site-header"); if(!host) return;
    const a = (href, label, key) => `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`;
    host.innerHTML = `
      <header class="header ${page === "accueil" ? "" : "solid"}" id="header">
        <div class="wrap nav">
          <button class="icon-btn burger" aria-label="Ouvrir le menu" data-open-menu>${IC.menu}</button>
          <nav class="nav-list"><li>${a("index.html","Accueil","accueil")}</li><li>${a("menu.html","La Carte","carte")}</li><li>${a("contact.html","Contact","contact")}</li></nav>
          <button class="btn-order" data-order>${IC.phone}<span>Commander</span></button>
          ${brand()}
        </div>
      </header>
      <div class="overlay" id="overlay" aria-hidden="true">
        <button class="icon-btn close" aria-label="Fermer" data-close-menu>${IC.close}</button>
        ${brand("o-brand")}
        ${a("index.html","Accueil","accueil")}${a("menu.html","La Carte","carte")}${a("contact.html","Contact","contact")}
        <a href="${telHref}" class="o-tel">${IC.phone} ${SITE.tel}</a>
      </div>`;
    const ov = $("#overlay");
    $("[data-open-menu]").onclick  = () => { ov.classList.add("open");    ov.setAttribute("aria-hidden","false"); };
    $("[data-close-menu]").onclick = () => { ov.classList.remove("open"); ov.setAttribute("aria-hidden","true"); };
    const h = $("#header");
    const onScroll = () => h.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---------- PIED DE PAGE ---------- */
  function buildFooter(){
    const host = $("#site-footer"); if(!host) return;
    host.innerHTML = `
      <footer class="footer">
        <div class="wrap footer-top">
          <div class="f-col">${brand("brand-lg")}<p class="f-slogan">${SITE.slogan}</p>${socials()}</div>
          <div class="f-col"><h5>Nous trouver</h5><p>${SITE.adresse}<br>${SITE.ville}</p><p><a href="${telHref}">${SITE.tel}</a></p></div>
          <div class="f-col"><h5>Horaires</h5><p>Ouvert ${SITE.ouverture}</p><p>Livraison midi ${SITE.livraison.midi}<br>Livraison soir ${SITE.livraison.soir}</p></div>
        </div>
        <div class="wrap footer-in">
          <nav class="footer-nav"><a href="index.html">Accueil</a><a href="menu.html">La Carte</a><a href="contact.html">Contact</a><a href="/politique-de-confidentialite.html">Confidentialité</a></nav>
          <p>© ${new Date().getFullYear()} ${SITE.nom} · 100% Halal</p>
          <p>Créé par <a class="by" href="https://artefood.fr">ArteFood</a></p>
        </div>
      </footer>`;
  }
  function socials(){
    const l = [["facebook","Facebook"],["instagram","Instagram"],["avisGoogle","Avis Google"],["uberEats","Uber Eats"]]
      .filter(([k]) => SITE[k])
      .map(([k, label]) => `<a href="${SITE[k]}" target="_blank" rel="noopener" aria-label="${label}">${IC[{avisGoogle:"star",uberEats:"uber"}[k] || k]}</a>`);
    l.push(`<a href="${telHref}" aria-label="Appeler">${IC.phone}</a>`);
    l.push(`<a href="https://maps.google.com/?q=${encodeURIComponent(SITE.adresse + " " + SITE.ville)}" target="_blank" rel="noopener" aria-label="Itinéraire">${IC.pin}</a>`);
    return `<div class="socials">${l.join("")}</div>`;
  }

  /* ---------- POP-UP COMMANDE ---------- */
  function buildOrderPopup(){
    const el = document.createElement("div");
    el.className = "popup"; el.id = "orderPopup"; el.setAttribute("aria-hidden","true");
    el.innerHTML = `
      <div class="popup-box" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
        <button class="icon-btn close" aria-label="Fermer" data-close-order>${IC.close}</button>
        <span class="eyebrow">Sur place · À emporter · Livraison</span>
        <h3 id="popupTitle">Commander</h3>
        <a href="${telHref}" class="btn hot wide">${IC.phone}<span>${SITE.tel}</span></a>
        ${SITE.uberEats ? `<a href="${SITE.uberEats}" target="_blank" rel="noopener" class="btn wide">${IC.uber}<span>Uber Eats</span></a>` : ""}
        <p class="popup-note">Livraison gratuite dès ${SITE.livraison.gratuite}<br>Midi ${SITE.livraison.midi} · Soir ${SITE.livraison.soir}</p>
      </div>`;
    document.body.appendChild(el);
    const open  = () => { el.classList.add("open");    el.setAttribute("aria-hidden","false"); document.body.style.overflow = "hidden"; };
    const close = () => { el.classList.remove("open"); el.setAttribute("aria-hidden","true");  document.body.style.overflow = ""; };
    document.addEventListener("click", e => { if(e.target.closest("[data-order]")){ e.preventDefault(); open(); } });
    $("[data-close-order]", el).onclick = close;
    el.addEventListener("click", e => { if(e.target === el) close(); });
    document.addEventListener("keydown", e => { if(e.key === "Escape"){ close(); $("#overlay")?.classList.remove("open"); } });
  }

  /* ---------- COOKIES ---------- */
  function cookieBanner(){
    let consent = null;
    try { consent = localStorage.getItem("cookieConsent"); } catch(e){}
    if(consent) return;
    const b = document.createElement("div");
    b.className = "cookie";
    b.innerHTML = `<p>Nous utilisons des cookies pour améliorer votre expérience. <a href="/politique-de-confidentialite.html" target="_blank">Politique de confidentialité</a></p>
      <div class="cookie-btns"><button class="btn ghost sm" data-c="refused">Refuser</button><button class="btn hot sm" data-c="accepted">Accepter</button></div>`;
    document.body.appendChild(b);
    setTimeout(() => b.classList.add("show"), 1200);
    $$("[data-c]", b).forEach(btn => btn.onclick = () => {
      try { localStorage.setItem("cookieConsent", btn.dataset.c); } catch(e){}
      b.classList.remove("show"); setTimeout(() => b.remove(), 500);
    });
  }

  /* ---------- COUVERTURE (photo ou vidéo) ---------- */
  function fillCover(){
    const el = $("[data-cover]"); if(!el || !SITE.couverture) return;
    const src = SITE.couverture;
    if(/\.(mp4|webm|mov)$/i.test(src)){
      const v = document.createElement("video");
      Object.assign(v, { autoplay: true, muted: true, loop: true, playsInline: true, src });
      v.addEventListener("loadeddata", () => el.classList.add("has-cover"));
      el.appendChild(v); v.play().catch(() => {});
    } else {
      const probe = new Image();
      probe.onload = () => { el.style.setProperty("--cover", `url("${new URL(src, location.href).href}")`); el.classList.add("has-cover"); };
      probe.src = src;
    }
  }

  /* ---------- INFOS ---------- */
  function fillInfo(){
    const map = {
      tel: SITE.tel, adresse: `${SITE.adresse}, ${SITE.ville}`, ouverture: SITE.ouverture,
      "livraison-midi": SITE.livraison.midi, "livraison-soir": SITE.livraison.soir,
      "livraison-gratuite": SITE.livraison.gratuite, email: SITE.email, slogan: SITE.slogan,
    };
    $$("[data-info]").forEach(el => { const v = map[el.dataset.info]; if(v) el.textContent = v; });
    $$("[data-tel]").forEach(el => el.href = telHref);
    $$("[data-maps]").forEach(el => el.href = `https://maps.google.com/?q=${encodeURIComponent(SITE.adresse + " " + SITE.ville)}`);
    $$("[data-map-embed]").forEach(el => el.src = `https://www.google.com/maps?q=${encodeURIComponent(SITE.adresse + " " + SITE.ville)}&output=embed`);
    $$("[data-socials]").forEach(el => el.outerHTML = socials());
    $$("[data-avis]").forEach(el => { if(SITE.avisGoogle) el.href = SITE.avisGoogle; else el.closest("[data-avis-block]")?.remove(); });
    $$("[data-hours]").forEach(el => {
      const today = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][new Date().getDay()];
      el.innerHTML = SITE.horaires.map(([d, h]) => `<li class="${d === today ? "today" : ""}"><span>${d}</span><i></i><span>${h}</span></li>`).join("");
    });
  }

  /* ---------- ACCUEIL : tuiles des rubriques ---------- */
  function renderTiles(){
    const mount = $("[data-tiles]"); if(!mount) return;
    mount.innerHTML = CARTE.map((c, i) => `
      <a href="menu.html#${c.id}" class="tile reveal-up ${c.img ? "has-img" : ""}" style="--d:${i * 60}ms${c.img ? `;--img:url('${new URL(media(c.img), location.href).href}')` : ""}">
        <span class="t-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="t-ico">${IC[c.icone] || IC.burger}</span>
        <span class="t-name">${c.titre}</span>
        <span class="t-sub">${c.accroche || ""}</span>
        <span class="t-go">Voir ${IC.arrow}</span>
      </a>`).join("");
  }

  /* ---------- CARTE ---------- */
  function pills(it){
    const out = [];
    if(it.seul) out.push(`<span class="pill"><small>Seul</small>${euro(it.seul)}</span>`);
    if(it.menu) out.push(`<span class="pill hot"><small>Menu</small>${euro(it.menu)}</span>`);
    if(it.prix) out.push(`<span class="pill hot"><small>Prix</small>${euro(it.prix)}</span>`);
    return out.join("");
  }
  const newTag = it => it.nouveau ? `<span class="tag-new">Nouveau</span>` : "";
  function groupHTML(g){
    const head = g.titre ? `<h4 class="g-title"><span>${g.titre}</span></h4>` : "";
    if(g.style === "list"){
      const twoCols = g.items.some(it => it.menu);
      const cols = twoCols ? `<li class="row row-head"><span></span><span class="r-prices"><em>Seul</em><em>Menu</em></span></li>` : "";
      const list = `<ul class="price-list reveal-up ${twoCols ? "" : "single-price"}">${cols}${g.items.map(it => `
        <li class="row"><span class="r-name">${it.nom}${newTag(it)}${it.desc ? `<em>${it.desc}</em>` : ""}</span><i class="dots"></i>
          <span class="r-prices">${twoCols ? `<b>${it.seul ? euro(it.seul) : "—"}</b><b class="hot">${it.menu ? euro(it.menu) : "—"}</b>` : `<b class="hot">${euro(it.prix)}</b>`}</span></li>`).join("")}
      </ul>`;
      return g.photo ? `${head}<div class="list-with-photo"><figure class="g-photo reveal-up"><img loading="lazy" src="${media(g.photo)}" alt="${g.titre}"></figure>${list}</div>` : head + list;
    }
    return `${head}<div class="dish-grid ${g.items.length === 1 ? "solo" : ""}">${g.items.map((it, i) => `
      <article class="dish reveal-up ${it.photo ? "has-photo" : ""}" style="--d:${(i % 3) * 70}ms">${newTag(it)}
        ${it.photo ? `<div class="d-photo"><img loading="lazy" src="${media(it.photo)}" alt="${it.nom}"></div>` : ""}
        <h5>${it.nom}</h5>${it.desc ? `<p>${it.desc}</p>` : ""}
        <div class="prices">${pills(it)}</div>
      </article>`).join("")}</div>`;
  }
  function renderMenu(){
    const mount = $("[data-carte]"); if(!mount) return;
    const chips = $("[data-chips]");
    if(chips) chips.innerHTML = CARTE.map(c => `<a href="#${c.id}" data-chip="${c.id}">${IC[c.icone] || ""}<span>${c.titre}</span></a>`).join("");
    mount.innerHTML = CARTE.map((c, i) => `
      <section class="menu-sec ${i % 2 ? "alt" : ""}" id="${c.id}">
        <div class="wrap">
          <div class="section-head">
            <span class="eyebrow">${c.accroche || ""}</span>
            <h2><span class="script">${c.titre}</span></h2>
            ${flourish}
            ${c.note ? `<p class="sub">${c.note}</p>` : ""}
          </div>
          ${c.viandes ? `<div class="chips-static"><span class="eyebrow">Viandes au choix</span><div>${c.viandes.map(v => `<span>${v}</span>`).join("")}</div></div>` : ""}
          ${c.groupes.map(groupHTML).join("")}
          ${c.supplements ? `<div class="supp reveal-up"><h6>Suppléments</h6><ul>${c.supplements.map(s => `<li><span>${s.nom}</span><b>+${euro(s.prix)}</b></li>`).join("")}</ul></div>` : ""}
        </div>
      </section>`).join("");

    // Pastille active selon la rubrique visible
    if(chips && "IntersectionObserver" in window){
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if(!e.isIntersecting) return;
        $$("[data-chip]", chips).forEach(a => a.classList.toggle("on", a.dataset.chip === e.target.id));
        const on = $(".on", chips); if(on) chips.scrollTo({ left: on.getBoundingClientRect().left - chips.getBoundingClientRect().left + chips.scrollLeft - 16, behavior: "smooth" });
      }), { rootMargin: "-45% 0px -50% 0px" });
      $$(".menu-sec", mount).forEach(s => io.observe(s));
    }
  }

  /* ---------- FORMULAIRE (mailto) ---------- */
  function initForm(){
    const f = $("#contactForm"); if(!f) return;
    f.addEventListener("submit", e => {
      e.preventDefault();
      const d = new FormData(f);
      const subject = encodeURIComponent(`Nouveau message depuis le site ${SITE.nom}`);
      const body = encodeURIComponent(`Nom : ${d.get("name") || "Non renseigné"}\nEmail : ${d.get("email")}\n\nMessage :\n${d.get("message")}`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      $(".form-ok", f).hidden = false;
      f.reset();
    });
  }

  /* ---------- ANIMATIONS ---------- */
  function scrollToId(id, behavior = "smooth"){
    const t = document.getElementById(id); if(!t) return false;
    const offset = ($(".chips-bar")?.offsetHeight || 0) + ($("#header")?.offsetHeight || 0);
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - offset + 1, behavior });
    return true;
  }
  function smoothAnchors(){
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]'); if(!a || a.getAttribute("href") === "#") return;
      if(scrollToId(a.getAttribute("href").slice(1))) e.preventDefault();
    });
  }
  function reveals(){
    const els = $$(".reveal-up");
    if(!("IntersectionObserver" in window)){ els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }

  buildHeader(); buildFooter(); buildOrderPopup(); cookieBanner();
  fillCover(); fillInfo(); renderTiles(); renderMenu(); initForm();
  useLogoIfAvailable(); smoothAnchors(); reveals();

  // Arrivée directe sur une ancre (ex. menu.html#tacos) : la carte est générée après le chargement
  if(location.hash) setTimeout(() => scrollToId(decodeURIComponent(location.hash.slice(1)), "auto"), 60);
})();
