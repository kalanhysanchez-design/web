(() => {
 const root = document.documentElement;
 const clamp = v => Math.min(1, Math.max(0, v));
 const lerp = (a, b, k) => Math.abs(b - a) < 0.0004 ? b : a + (b - a) * k;

 // Separar palabras: títulos con máscara y manifiesto palabra por palabra.
 const split = (el, cls) => {
  let i = 0;
  const walk = node => [...node.childNodes].forEach(child => {
   if (child.nodeType === 3) {
    const frag = document.createDocumentFragment();
    child.textContent.split(/(\s+)/).forEach(part => {
     if (!part) return;
     if (/^\s+$/.test(part)) { frag.append(part); return; }
     const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
     if (cls) { const mask = document.createElement('span'); mask.className = cls; mask.append(inner); frag.append(mask); }
     else frag.append(inner);
    });
    child.replaceWith(frag);
   } else if (child.nodeType === 1 && cls && child.classList.contains('grad')) {
    // Las palabras en degradé se animan como un bloque: si se separan, el degradé no se pinta.
    const mask = document.createElement('span'); mask.className = cls;
    const inner = document.createElement('span'); inner.style.setProperty('--i', i++);
    child.replaceWith(mask); inner.append(child); mask.append(inner);
   } else if (child.nodeType === 1) walk(child);
  });
  walk(el);
  return i;
 };
 document.querySelectorAll('[data-split],[data-mask]').forEach(el => split(el, 'w'));
 document.querySelectorAll('[data-words]').forEach(el => { el.setAttribute('aria-label', el.textContent); el.style.setProperty('--n', split(el)); });

 // Menú: al bajar se compacta (la marca queda solo en logo); al subir se despliega.
 const topbar = document.querySelector('.topbar');
 let lastY = scrollY;
 addEventListener('scroll', () => {
  const y = scrollY;
  if (y > 160 && y > lastY + 10) topbar.classList.add('compact');
  else if (y < lastY - 10 || y < 160) topbar.classList.remove('compact');
  if (Math.abs(y - lastY) > 10) lastY = y;
 }, { passive: true });

 // Grupos en cascada: cada tarjeta conoce su posición.
 document.querySelectorAll('[data-group]').forEach(g => [...g.children].forEach((c, i) => c.style.setProperty('--i', i)));

 // Menú en celular: la sección actual abre una cascada de píldoras con el fondo difuminado.
 (() => {
  const tabs = document.querySelector('.tabs');
  const bar = document.querySelector('.topbar');
  if (!tabs || !bar) return;
  const mobile = matchMedia('(max-width: 899px)');
  const current = tabs.querySelector('[aria-current="page"]') || tabs.querySelector('.tab');
  const chev = document.createElement('span');
  chev.className = 'chev'; chev.setAttribute('aria-hidden', 'true');
  current.append(chev);
  const scrim = document.createElement('div');
  scrim.className = 'menu-scrim';
  const list = document.createElement('nav');
  list.className = 'menu-list'; list.setAttribute('aria-label', 'Secciones');
  [...tabs.querySelectorAll('.tab')].forEach((tab, i) => {
   const link = document.createElement('a');
   link.href = tab.getAttribute('href'); link.textContent = tab.textContent;
   link.className = 'menu-pill'; link.style.setProperty('--i', i);
   if (tab === current) link.setAttribute('aria-current', 'page');
   list.append(link);
  });
  document.body.append(scrim, list);
  current.setAttribute('aria-expanded', 'false');
  const setOpen = open => {
   document.documentElement.classList.toggle('menu-open', open);
   current.setAttribute('aria-expanded', String(open));
   // El video se pausa mientras el menú está abierto (ahorra memoria) y luego sigue.
   document.querySelectorAll('video').forEach(v => {
    if (open && !v.paused) { v.dataset.menuPaused = '1'; v.pause(); }
    else if (!open && v.dataset.menuPaused) { delete v.dataset.menuPaused; v.play().catch(() => {}); }
   });
  };
  current.addEventListener('click', e => {
   if (!mobile.matches) return;
   e.preventDefault();
   setOpen(!document.documentElement.classList.contains('menu-open'));
  });
  scrim.addEventListener('click', () => setOpen(false));
  list.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  mobile.addEventListener('change', () => setOpen(false));
 })();

 // Celular: filas deslizables de tarjetas con puntitos indicadores (estilo iOS).
 if (false) document.querySelectorAll('.tile-rail, .bento[data-group]').forEach(shelf => {
  shelf.classList.add('shelf');
  const cards = [...shelf.children];
  if (cards.length < 2) return;
  const dots = document.createElement('div');
  dots.className = 'shelf-dots'; dots.setAttribute('aria-hidden', 'true');
  cards.forEach(() => dots.append(document.createElement('span')));
  shelf.after(dots);
  const update = () => {
   const step = cards[1].offsetLeft - cards[0].offsetLeft || 1;
   const i = Math.min(cards.length - 1, Math.round(shelf.scrollLeft / step));
   [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
  };
  shelf.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
 });

 // Barra de carga arcoíris en la parte superior.
 const bar = document.createElement('div');
 bar.className = 'loadbar'; bar.setAttribute('aria-hidden', 'true');
 document.body.prepend(bar);
 document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
  bar.classList.add('leaving');
 });
 addEventListener('pageshow', () => bar.classList.remove('leaving'));

 // ---------- Funciones comunes a todas las páginas ----------
 // WhatsApp con mensaje según el botón.
 const WHATSAPP = '573104959017';
 const messages = {
  contribuir: 'Hola, Kalanhy Esmeralda Gil. Quiero sumarme a sus causas con un aporte. ¿Qué iniciativas están recibiendo apoyo y cómo puedo contribuir?',
  'ser voluntario': 'Hola, Kalanhy Esmeralda Gil. Me gustaría compartir mi tiempo y mis habilidades como voluntario. ¿Cómo puedo participar en sus iniciativas?',
  'conocer el movimiento': 'Hola, Kalanhy Esmeralda Gil. Conocí su movimiento de impacto social a través de la página web y me gustaría saber cómo puedo sumarme a sus iniciativas. ¿Me comparten más información?'
 };
 document.querySelectorAll('[data-contact]').forEach(el => el.addEventListener('click', () => {
  const reason = el.dataset.contact;
  const text = messages[reason] || `Hola, Kalanhy Esmeralda Gil. Vi su tienda con propósito y me gustaría ${reason}. ¿Me comparten los precios, la disponibilidad y cómo realizar mi compra?`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
 }));

 // Compartir el movimiento.
 const toast = document.querySelector('.toast');
 const showToast = msg => { if (!toast) return; toast.textContent = msg; toast.classList.add('visible'); setTimeout(() => toast.classList.remove('visible'), 4000); };
 document.querySelectorAll('[data-share]').forEach(el => el.addEventListener('click', async () => {
  const text = 'Conoce Más allá de nosotros, un movimiento de impacto social que conecta personas y acompaña causas en Colombia. Puedes sumar tu tiempo, tus conocimientos o un aporte. Escríbeles: https://wa.me/' + WHATSAPP;
  try {
   if (navigator.share) await navigator.share({ title: 'Una causa compartida', text });
   else if (navigator.clipboard) { await navigator.clipboard.writeText(text); showToast('Mensaje copiado. Compártelo con quien quiera sumar.'); }
   else window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
  } catch (error) { if (error.name !== 'AbortError') window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer'); }
 }));

 // Preguntas frecuentes: apertura y cierre con altura animada.
 document.querySelectorAll('.faq-list details').forEach(item => {
  const summary = item.querySelector('summary');
  let anim = null;
  summary.addEventListener('click', event => {
   event.preventDefault();
   const opening = !item.classList.contains('is-open');
   if (opening) document.querySelectorAll('.faq-list details.is-open').forEach(other => { if (other !== item) other.querySelector('summary').click(); });
   item.classList.toggle('is-open', opening);
   const start = item.offsetHeight;
   item.open = true;
   const end = opening ? item.scrollHeight : summary.offsetHeight;
   anim?.cancel();
   if (!item.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) { item.open = opening; return; }
   item.style.overflow = 'hidden';
   anim = item.animate([{ height: start + 'px' }, { height: end + 'px' }], { duration: opening ? 520 : 380, easing: 'cubic-bezier(.32,.72,0,1)' });
   anim.onfinish = () => { item.open = opening; item.style.overflow = ''; anim = null; };
  });
 });

 // Video con pausa al tocarlo; si la persona lo pausa, no se reanuda solo.
 document.querySelectorAll('video[data-toggle]').forEach(video => {
  const wrap = video.closest('figure');
  const btn = wrap?.querySelector('.video-toggle');
  const sync = () => { const paused = video.paused; wrap?.classList.toggle('is-paused', paused); btn?.setAttribute('aria-label', paused ? 'Reproducir video' : 'Pausar video'); };
  const toggle = () => { if (video.paused) { video.dataset.userPaused = ''; video.play().catch(() => {}); } else { video.dataset.userPaused = '1'; video.pause(); } };
  video.addEventListener('click', toggle); btn?.addEventListener('click', toggle);
  video.addEventListener('play', sync); video.addEventListener('pause', sync); sync();
 });

 // Videos: solo se reproducen cuando están en pantalla.
 if ('IntersectionObserver' in window) {
  const vio = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { if (!e.target.dataset.userPaused) e.target.play().catch(() => {}); } else e.target.pause(); }), { threshold: .2 });
  document.querySelectorAll('video[data-autoplay]').forEach(v => vio.observe(v));
 }

 // Nosotros es cinematográfico; las demás páginas usan scroll normal
 // (solo sus escenas marcadas con data-pin se animan con el scroll).
 // Cinematográfico también en celular; solo se desactiva si la persona pidió reducir el movimiento.
 const desktop = !matchMedia('(prefers-reduced-motion: reduce)').matches;
 let simple = root.classList.contains('simple');
 // En celular, las páginas simples también aparecen con el scroll, como Nosotros.
 if (simple && desktop && matchMedia('(max-width: 899px)').matches) {
  simple = false;
  document.querySelectorAll('.chapter, .reveal, [data-group]').forEach(el => el.setAttribute('data-fx', ''));
  document.querySelectorAll('.tile').forEach(el => { if (!el.parentElement.matches('[data-group]')) el.setAttribute('data-fx', ''); });
  document.querySelectorAll('.reveal, .tile').forEach(el => el.classList.add('in'));
 }
 if (!desktop || simple) {
  if (!desktop) root.classList.add('static');
  const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  document.querySelectorAll('.reveal,.tile').forEach(el => io.observe(el));
  // Grupos: todas sus tarjetas aparecen juntas, en cascada, al entrar el grupo.
  const gio = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { [...e.target.children].forEach(c => c.classList.add('in')); gio.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('[data-group]').forEach(el => gio.observe(el));
  if (!desktop || !document.querySelector('[data-pin]')) return;
 } else root.classList.add('js');

 // Celular: los mosaicos de texto se vuelven un mazo; las tarjetas aparecen una por una con el scroll.
 const decks = [];
 if (false) document.querySelectorAll('.about .bento, .bento[data-group]').forEach(bento => {
  bento.querySelectorAll('.tile-rail').forEach(rail => rail.replaceWith(...rail.children));
  const cards = [...bento.children].filter(c => c.classList.contains('tile'));
  const stick = document.createElement('div');
  stick.className = 'deck-stick';
  cards.forEach(card => { card.removeAttribute('data-fx'); card.classList.add('deck-card', 'in'); stick.append(card); });
  bento.removeAttribute('data-fx'); bento.removeAttribute('data-group');
  bento.classList.add('deck'); bento.style.setProperty('--n', cards.length); bento.setAttribute('data-pin', '');
  bento.append(stick);
  decks.push({ el: bento, cards });
 });

 const scenes = [
  ...[...document.querySelectorAll('[data-pin]')].map(el => ({ el, pin: true, c: -1 })),
  ...(simple ? [] : [...document.querySelectorAll('[data-fx]')].map(el => ({ el, pin: false, c: -1 })))
 ];
 const mesh = document.querySelector('.mesh');
 const mvv = scenes.find(s => s.el.classList.contains('mvv'));
 const track = document.querySelector('.track');
 const panels = [...document.querySelectorAll('.panel')];
 const count = document.querySelector('.mvv-count');
 const values = scenes.find(s => s.el.classList.contains('values'));
 const items = [...document.querySelectorAll('.v-item')];
 const bars = [...document.querySelectorAll('.v-progress span')];
 let meshC = -1, running = false;

 // ---------- Motor de scroll fluido ----------
 // Las posiciones se miden una sola vez (al cargar y al cambiar el tamaño);
 // durante el scroll solo se hace aritmética, sin forzar al navegador a recalcular.
 let vh = innerHeight, docH = 1, trackMax = 0, panelGeo = [];
 const absTop = el => { let t = 0; for (let n = el; n; n = n.offsetParent) t += n.offsetTop; return t; };
 function measure() {
  vh = innerHeight;
  docH = Math.max(1, document.documentElement.scrollHeight - vh);
  scenes.forEach(s => { s.top = absTop(s.el); s.h = s.el.offsetHeight; });
  if (mvv) {
   const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
   const last = panels[panels.length - 1];
   trackMax = Math.max(0, last.offsetLeft + last.offsetWidth + pad - track.clientWidth);
   panelGeo = panels.map(p => ({ c: p.offsetLeft + p.offsetWidth / 2, w: p.offsetWidth }));
  }
 }
 let lastMvv = -1, lastValues = -1, lastCount = '';
 function frame() {
  const y = scrollY;
  let busy = false;
  for (const s of scenes) {
   const top = s.top - y;
   // Lejos de la pantalla y ya en reposo: no se toca.
   if (s.c >= 0 && (top > vh * 1.6 || top + s.h < -vh * .6) && !s.pin) continue;
   const t = s.pin ? clamp(-top / Math.max(1, s.h - vh)) : clamp((vh - top) / (vh + s.h));
   const n = s.c < 0 ? t : lerp(s.c, t, s.pin ? 0.13 : 0.16);
   if (n !== s.c) { s.c = n; s.el.style.setProperty('--p', n.toFixed(4)); }
   if (n !== t) busy = true;
  }

  // Galería horizontal: el scroll vertical desliza los paneles.
  if (mvv && mvv.c !== lastMvv) {
   lastMvv = mvv.c;
   const p = clamp((mvv.c - .06) / .78);
   const tx = -trackMax * p;
   track.style.transform = `translate3d(${tx.toFixed(1)}px,0,0)`;
   const mid = innerWidth / 2;
   let best = 0, bestF = -1;
   panelGeo.forEach((g, i) => {
    const f = clamp(1 - Math.abs(g.c + tx - mid) / (g.w * .9));
    panels[i].style.setProperty('--f', f.toFixed(3));
    if (f > bestF) { bestF = f; best = i; }
   });
   const text = `0${best + 1} / 0${panels.length}`;
   if (text !== lastCount) { count.textContent = text; lastCount = text; }
  }

  // Valores y pasos: uno a la vez.
  if (values && values.c !== lastValues) {
   lastValues = values.c;
   const p = values.c;
   items.forEach((item, i) => {
    let local = p * items.length - i;
    if (i === 0) local = Math.max(local, .5);
    if (i === items.length - 1) local = Math.min(local, .5);
    const o = clamp(1 - Math.abs(local - .5) * 2.6 + .3);
    item.style.setProperty('--o', o.toFixed(3));
    item.style.pointerEvents = o > .5 ? 'auto' : 'none';
    item.style.setProperty('--y', ((local - .5) * -120).toFixed(1) + 'px');
   });
   const active = Math.min(bars.length - 1, Math.floor(p * bars.length));
   bars.forEach((bar, i) => {
    bar.style.setProperty('--fill', clamp(p * bars.length - i).toFixed(3));
    bar.classList.toggle('on', i === active);
    bar.classList.toggle('done', i < active);
   });
   if (active !== values.active) {
    values.active = active;
    const word = items[active].querySelector('.v-word');
    word.classList.remove('pop'); requestAnimationFrame(() => word.classList.add('pop'));
   }
  }

  // Malla de color: se desplaza con el avance de toda la página.
  const sT = clamp(y / docH);
  const m = meshC < 0 ? sT : lerp(meshC, sT, 0.08);
  if (Math.abs(m - meshC) > .0004 || meshC < 0) { meshC = m; mesh.style.setProperty('--s', m.toFixed(4)); }
  if (meshC !== sT) busy = true;

  running = busy;
  if (busy) requestAnimationFrame(frame);
 }
 const kick = () => { if (!running) { running = true; requestAnimationFrame(frame); } };
 let resizeTimer;
 const remeasure = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { measure(); lastMvv = lastValues = -1; kick(); }, 120); };
 addEventListener('scroll', kick, { passive: true });
 addEventListener('resize', remeasure);
 addEventListener('load', remeasure);
 if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(document.body);
 measure();
 frame();
})();
