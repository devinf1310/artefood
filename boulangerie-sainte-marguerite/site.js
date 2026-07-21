/* ============================================================
   SITE.JS — moteur commun (ne pas éditer pour ajouter des médias :
   passe par config.js). Assemble header/footer, diaporamas,
   galeries + lightbox, vidéos, formulaire de contact.
   ============================================================ */
(function(){
  "use strict";
  const S = window.SITE || {};
  const $  = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>[...c.querySelectorAll(s)];

  /* ---------- icônes ---------- */
  const IC = {
    burger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    cart  :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
    arrow :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left  :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M15 6l-6 6 6 6"/></svg>',
    right :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 6l6 6-6 6"/></svg>',
    plus  :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 6v12M6 12h12"/></svg>',
    play  :'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    orn   :'<svg class="b-orn" viewBox="0 0 200 20" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M6 12H78"/><path d="M122 12H194"/><path d="M86 12c3-6 8-6 8 0M114 12c-3-6-8-6-8 0"/><path d="M100 2c2 3 2 5 0 8c-2-3-2-5 0-8Z" fill="currentColor" stroke="none"/><circle cx="100" cy="15" r="1.4" fill="currentColor" stroke="none"/></svg>',
    slot  :'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M20 5c-2.5 5-2.5 8 0 13 2.5-5 2.5-8 0-13Z" fill="currentColor" stroke="none"/><path d="M20 18v17M14 24c3 0 6 3 6 6M26 24c-3 0-6 3-6 6"/></svg>',
    pin   :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 21s-7-5.4-7-11a7 7 0 0 1 14 0c0 5.6-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    phone :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 4h3l2 5-2 1.5a11 11 0 0 0 4.5 4.5L17 17l5 2v3a1 1 0 0 1-1 1A17 17 0 0 1 4 6a1 1 0 0 1 1-1"/></svg>',
    clock :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
    mail  :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>',
    fb    :'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>',
    ig    :'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
  };

  const PAGES = [
    {key:'accueil',     label:'Accueil',       href:'index.html',       side:'left'},
    {key:'boulangerie', label:'Boulangerie',   href:'boulangerie.html', side:'left'},
    {key:'patisserie',  label:'Pâtisserie',    href:'patisserie.html',  side:'left'},
    {key:'creations',   label:'Nos créations', href:'creations.html',   side:'right'},
    {key:'maison',      label:'La maison',     href:'la-maison.html',   side:'right'},
    {key:'contact',     label:'Contact',       href:'contact.html',     side:'right'},
  ];
  const current = document.body.dataset.page || 'accueil';

  const brandBlock = (cls='')=>`
    <span class="b-over gold-text">Boulangerie</span>
    <span class="b-name gold-text">Sainte&nbsp;Marguerite</span>
    ${cls==='orn'?IC.orn:''}`;

  /* ---------- HEADER + MENU ---------- */
  function buildHeader(){
    const host = $('#site-header'); if(!host) return;
    const li = p=>`<li><a href="${p.href}" class="${p.key===current?'active':''}">${p.label}</a></li>`;
    const left  = PAGES.filter(p=>p.side==='left').map(li).join('');
    const right = PAGES.filter(p=>p.side==='right').map(li).join('');
    host.innerHTML = `
    <header class="header" id="header">
      <div class="wrap">
        <nav class="nav" aria-label="Navigation principale">
          <button class="icon-btn burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false">${IC.burger}</button>
          <ul class="nav-list left">${left}</ul>
          <a href="index.html" class="brand" aria-label="Boulangerie Sainte-Marguerite — accueil">${brandBlock('orn')}</a>
          <ul class="nav-list right">${right}
            <li><a href="contact.html" class="icon-btn cart" aria-label="Nous contacter">${IC.cart}</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="overlay" id="overlay" role="dialog" aria-modal="true" aria-label="Menu">
      <button class="icon-btn close" id="close" aria-label="Fermer le menu">${IC.close}</button>
      <div class="brand o-brand">${brandBlock()}</div>
      ${PAGES.map(p=>`<a href="${p.href}" class="${p.key===current?'active':''}">${p.label}</a>`).join('')}
    </div>`;

    const header=$('#header'), overlay=$('#overlay'), burger=$('#burger'), close=$('#close');
    const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>40);
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
    const open =()=>{overlay.classList.add('open');burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';};
    const shut =()=>{overlay.classList.remove('open');burger.setAttribute('aria-expanded','false');document.body.style.overflow='';};
    burger.addEventListener('click',open); close.addEventListener('click',shut);
    $$('a',overlay).forEach(a=>a.addEventListener('click',shut));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')shut();});
  }

  /* ---------- FOOTER ---------- */
  function buildFooter(){
    const host=$('#site-footer'); if(!host) return;
    const nav=PAGES.map(p=>`<a href="${p.href}">${p.label}</a>`).join('');
    host.innerHTML=`
    <footer class="footer">
      <div class="wrap footer-in">
        <p>© <span id="year"></span> Boulangerie Sainte-Marguerite — La Ciotat</p>
        <nav class="footer-nav">${nav}</nav>
        <a href="index.html" class="by">by Artefood</a>
      </div>
    </footer>`;
    $('#year').textContent=new Date().getFullYear();
  }

  /* ---------- HÉROS / SUB-HÉROS : image de fond depuis config ---------- */
  function fillHeroBackgrounds(){
    const H=S.hero||{};
    $$('[data-hero]').forEach(el=>{
      const cfg=H[el.dataset.hero]||{};
      if(cfg.video){
        el.innerHTML=`<video autoplay muted loop playsinline poster="${cfg.img||''}"><source src="${cfg.video}" type="video/mp4"></video>`;
      }else{
        const media=document.createElement('div'); media.className='media';
        if(cfg.img) media.style.setProperty('--hero-img',`url("${cfg.img}")`);
        if(cfg.imgMobile) media.style.setProperty('--hero-img-m',`url("${cfg.imgMobile}")`);
        else if(cfg.img) media.style.setProperty('--hero-img-m',`url("${cfg.img}")`);
        el.appendChild(media);
      }
    });
    $$('[data-bg]').forEach(el=>{const cfg=H[el.dataset.bg]||{};if(cfg.img)el.style.backgroundImage=`url("${cfg.img}")`;});
    $$('[data-subhero]').forEach(el=>{
      const cfg=H[el.dataset.subhero]||{};
      const bg=$('.sh-bg',el);
      if(bg && cfg.img){bg.style.backgroundImage=`url("${cfg.img}")`;bg.classList.add('has-img');}
    });
  }

  /* ---------- CARROUSEL ---------- */
  function initCarousel(mount){
    const items=(S[mount.dataset.carousel]||[]).filter(x=>x.src);
    mount.innerHTML=`
      <button class="car-ctrl car-prev" aria-label="Précédent">${IC.left}</button>
      <div class="track-mask"><div class="track"></div></div>
      <button class="car-ctrl car-next" aria-label="Suivant">${IC.right}</button>
      <div class="dots"></div>`;
    const track=$('.track',mount), prev=$('.car-prev',mount), next=$('.car-next',mount), dotsBox=$('.dots',mount);
    track.innerHTML=items.map(c=>`
      <article class="card">
        <div class="frame"><img loading="lazy" src="${c.src}" alt="${c.titre||''}"></div>
        <span class="gild"></span>
        <div class="meta"><h3>${c.titre||''}</h3>${c.desc?`<p>${c.desc}</p>`:''}</div>
      </article>`).join('');
    let index=0,perView=4,maxIndex=0;
    const pv=()=>{const w=innerWidth;return w<=640?1:w<=1024?2:4;};
    const dots=()=>{dotsBox.innerHTML='';for(let i=0;i<=maxIndex;i++){const b=document.createElement('button');b.setAttribute('aria-label','Page '+(i+1));b.onclick=()=>{index=i;render();};dotsBox.appendChild(b);}};
    const render=()=>{const cards=track.children;if(!cards.length)return;const w=cards[0].getBoundingClientRect().width;const g=parseFloat(getComputedStyle(track).gap)||0;track.style.transform=`translateX(-${index*(w+g)}px)`;prev.disabled=index<=0;next.disabled=index>=maxIndex;[...dotsBox.children].forEach((d,i)=>d.classList.toggle('on',i===index));};
    const layout=()=>{perView=pv();maxIndex=Math.max(0,items.length-perView);index=Math.min(index,maxIndex);dots();render();};
    prev.onclick=()=>{index=Math.max(0,index-1);render();};
    next.onclick=()=>{index=Math.min(maxIndex,index+1);render();};
    let x0=null;
    track.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
    track.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>44)dx<0?next.onclick():prev.onclick();x0=null;});
    let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(layout,150);});
    layout();
  }

  /* ---------- GALERIE + LIGHTBOX + FILTRES ---------- */
  let LB, lbItems=[], lbIndex=0;
  function ensureLightbox(){
    if(LB) return;
    LB=document.createElement('div'); LB.className='lightbox'; LB.setAttribute('role','dialog'); LB.setAttribute('aria-label','Aperçu');
    LB.innerHTML=`
      <button class="lb-btn lb-close" aria-label="Fermer">${IC.close}</button>
      <button class="lb-btn lb-prev" aria-label="Précédent">${IC.left}</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button class="lb-btn lb-next" aria-label="Suivant">${IC.right}</button>`;
    document.body.appendChild(LB);
    const fig=$('figure',LB);
    const show=()=>{const it=lbItems[lbIndex];
      const cap=(it.titre||'')+(it.desc?`<small>${it.desc}</small>`:'');
      if(it.video){fig.innerHTML=`<video src="${it.video}" poster="${it.src||''}" controls autoplay playsinline></video><figcaption>${cap}</figcaption>`;}
      else{fig.innerHTML=`<img src="${it.src}" alt="${it.titre||''}"><figcaption>${cap}</figcaption>`;}
    };
    const close=()=>LB.classList.remove('open');
    $('.lb-close',LB).onclick=close;
    $('.lb-prev',LB).onclick=()=>{lbIndex=(lbIndex-1+lbItems.length)%lbItems.length;show();};
    $('.lb-next',LB).onclick=()=>{lbIndex=(lbIndex+1)%lbItems.length;show();};
    LB.addEventListener('click',e=>{if(e.target===LB)close();});
    document.addEventListener('keydown',e=>{if(!LB.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')$('.lb-prev',LB).click();if(e.key==='ArrowRight')$('.lb-next',LB).click();});
    LB._show=show;
  }
  function openLightbox(items,i){ensureLightbox();lbItems=items;lbIndex=i;LB._show();LB.classList.add('open');}

  function initGallery(mount){
    const key=mount.dataset.gallery;
    const items=(S[key]||[]).filter(x=>x.src||x.video);
    const nPh=S[key+'Placeholders']||6;
    const cats=[...new Set(items.map(x=>x.cat).filter(Boolean))];
    const wrap=document.createElement('div');
    // onglets de filtre si catégories présentes
    if(cats.length>1){
      const tabs=document.createElement('div');tabs.className='tabs';
      tabs.innerHTML=`<button class="on" data-f="*">Tout</button>`+cats.map(c=>`<button data-f="${c}">${c}</button>`).join('');
      wrap.appendChild(tabs);
      tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',tabs).forEach(x=>x.classList.remove('on'));b.classList.add('on');paint(b.dataset.f);});
    }
    const grid=document.createElement('div');grid.className='grid';wrap.appendChild(grid);
    mount.innerHTML='';mount.appendChild(wrap);

    function paint(filter='*'){
      const list=items.filter(x=>filter==='*'||x.cat===filter);
      grid.innerHTML='';
      list.forEach((it,i)=>{
        const t=document.createElement('article');t.className='tile'+(it.video?' has-video':'');
        const media = it.src ? `<img loading="lazy" src="${it.src}" alt="${it.titre||''}">` : `<span class="novideo-bg"></span>`;
        const badge = it.video ? `<span class="plus play-badge">${IC.play}</span>` : `<span class="plus">${IC.plus}</span>`;
        t.innerHTML=`${media}${badge}
          <div class="cap"><h3>${it.titre||''}</h3>${it.desc?`<p>${it.desc}</p>`:''}</div>`;
        t.addEventListener('click',()=>openLightbox(list,i));
        grid.appendChild(t);
      });
      const need=Math.max(0,nPh-list.length);
      for(let i=0;i<need;i++){
        const s=document.createElement('div');s.className='tile slot';
        s.innerHTML=`<div class="s-in">${IC.slot}<span>Visuel à venir</span></div>`;
        grid.appendChild(s);
      }
    }
    paint('*');
  }

  /* ---------- VIDÉO À LA UNE ---------- */
  function initVideo(mount){
    const cfg=S[mount.dataset.video]||{};
    if(cfg.src){
      mount.innerHTML=`
        <video id="vb" preload="none" poster="${cfg.poster||''}" playsinline></video>
        <div class="poster" style="background-image:url('${cfg.poster||''}')"></div>
        <button class="play" aria-label="Lire la vidéo">${IC.play}</button>
        ${cfg.titre?`<div class="vcap"><h3>${cfg.titre}</h3>${cfg.desc?`<p>${cfg.desc}</p>`:''}</div>`:''}`;
      const v=$('#vb',mount),poster=$('.poster',mount),play=$('.play',mount);
      const start=()=>{v.src=v.src||cfg.src;if(!v.querySelector('source')){const s=document.createElement('source');s.src=cfg.src;s.type='video/mp4';v.appendChild(s);} v.controls=true;poster.style.display='none';play.style.display='none';v.play();};
      play.onclick=start;poster.onclick=start;
    }else{
      mount.classList.add('slot');
      mount.innerHTML=`<div class="s-in">${IC.slot}<span>Vidéo à venir</span></div>`;
    }
  }

  /* ---------- VISUELS ÉDITORIAUX (La Maison) ---------- */
  function fillEditorial(){
    $$('[data-ed]').forEach(el=>{
      const it=(S.maison||[])[+el.dataset.ed];
      if(it&&it.src){el.innerHTML=`<img loading="lazy" src="${it.src}" alt="">`;}
      else{el.classList.add('slot');el.innerHTML=`<div class="s-in">${IC.slot}<span>Visuel à venir</span></div>`;}
    });
  }

  /* ---------- COORDONNÉES (injection) ---------- */
  function fillInfo(){
    const map={tel:S.tel,adresse:S.adresse,horaires:S.horaires,email:S.email};
    $$('[data-info]').forEach(el=>{const v=map[el.dataset.info];if(v)el.textContent=v;});
    $$('[data-info-link="tel"]').forEach(a=>{if(S.telHref)a.href='tel:'+S.telHref;a.textContent=S.tel;});
    $$('[data-info-link="email"]').forEach(a=>{a.href='mailto:'+S.email;a.textContent=S.email;});
    $$('[data-social="facebook"]').forEach(a=>a.href=S.facebook||'#');
    $$('[data-social="instagram"]').forEach(a=>a.href=S.instagram||'#');
  }

  /* ---------- FORMULAIRE CONTACT ---------- */
  function initForm(){
    const f=$('#contact-form'); if(!f) return;
    if(S.formAction){f.setAttribute('action',S.formAction);f.setAttribute('method','post');return;}
    // sans backend : ouvre le client mail
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const d=new FormData(f);
      const body=`Nom : ${d.get('nom')||''}%0D%0AE-mail : ${d.get('email')||''}%0D%0ATéléphone : ${d.get('tel')||''}%0D%0A%0D%0A${(d.get('message')||'').replace(/\n/g,'%0D%0A')}`;
      window.location.href=`mailto:${S.email}?subject=${encodeURIComponent('Contact site — '+(d.get('nom')||''))}&body=${body}`;
    });
  }

  /* ---------- ancres douces ---------- */
  function smoothAnchors(){
    $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
      const id=a.getAttribute('href');if(id.length<2)return;
      const el=$(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}
    }));
  }

  /* ---------- révélation au scroll ---------- */
  function reveals(){
    const els=$$('[data-reveal]');if(!els.length)return;
    const io=new IntersectionObserver((en)=>{en.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.15});
    els.forEach(el=>io.observe(el));
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded',()=>{
    buildHeader(); buildFooter(); fillHeroBackgrounds();
    $$('[data-carousel]').forEach(initCarousel);
    $$('[data-gallery]').forEach(initGallery);
    $$('[data-video]').forEach(initVideo);
    fillEditorial(); fillInfo(); initForm(); smoothAnchors(); reveals();
  });
})();
