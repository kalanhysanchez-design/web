const projects = [
  {
    "title": "FUNDAYAMA",
    "tagline": "Acompañar también es una forma de transformar vidas.",
    "summary": "Acompañamos a mujeres que atraviesan procesos relacionados con el cáncer, participando en actividades, visitas, entrega de ayudas y espacios de escucha y sensibilización. Creemos que ninguna mujer debería sentirse sola en su camino.",
    "paragraphs": [
      "Hay momentos en la vida en los que una palabra de aliento, una visita o simplemente alguien dispuesto a escuchar puede significar mucho.",
      "A través de nuestra participación con FUNDAYAMA, nos vinculamos a iniciativas de acompañamiento dirigidas a mujeres que atraviesan procesos relacionados con el cáncer, buscando brindar espacios de cercanía, solidaridad y apoyo humano.",
      "Nuestra participación comprende visitas, actividades recreativas, espacios de escucha, entrega de ayudas y jornadas de sensibilización que permiten compartir experiencias y fortalecer los vínculos entre las mujeres.",
      "Entendemos que cada historia es diferente y que detrás de cada proceso hay una mujer con sueños, emociones y una historia que merece ser reconocida. Por eso, queremos contribuir a que estos espacios sean también oportunidades para compartir, sentirse acompañadas y recordar que no están solas.",
      "Nuestra labor no reemplaza la atención médica ni el acompañamiento profesional especializado. Es una expresión de solidaridad y compromiso humano que busca sumar desde la presencia, la escucha y la voluntad de ayudar."
    ],
    "commitment": "Estar presentes, compartir momentos, escuchar historias y aportar a iniciativas que promuevan el bienestar y la solidaridad entre mujeres.",
    "closing": "Porque acompañar también es decirle a alguien: no estás sola."
  },
  {
    "title": "IDENTIDAD DESPIERTA",
    "tagline": "El acceso al agua puede abrir nuevas oportunidades para una comunidad.",
    "summary": "Nos vinculamos a iniciativas de acceso al agua potable en La Guajira, apoyando la entrega de filtros que contribuyen al bienestar de las comunidades y a mejorar sus oportunidades de acceso al agua.",
    "paragraphs": [
      "El agua es esencial para la vida y el bienestar de las personas. Sin embargo, en diferentes territorios de Colombia, acceder a agua potable continúa siendo un desafío para muchas comunidades.",
      "A través de nuestra vinculación con Identidad Despierta, participamos en una iniciativa orientada a apoyar comunidades de La Guajira mediante la entrega de filtros de agua potable.",
      "Creemos que contribuir al acceso al agua es también una manera de aportar al bienestar de las familias y acompañar procesos que buscan mejorar sus condiciones de vida.",
      "Nos mueve la posibilidad de conectar esfuerzos, sumar voluntades y apoyar iniciativas que llevan soluciones a territorios donde se necesitan."
    ],
    "commitment": "Apoyar acciones que contribuyan al acceso al agua potable, visibilizar las necesidades de las comunidades y promover la solidaridad como herramienta para construir oportunidades.",
    "closing": "Porque cuando trabajamos juntos, podemos acercar soluciones que hacen la diferencia."
  },
  {
    "title": "CORPS MODEL",
    "tagline": "El talento necesita oportunidades para descubrir todo lo que puede lograr.",
    "summary": "Apoyamos procesos de formación para modelos jóvenes y adultos mediante clases de modelaje, oratoria, dicción y maquillaje, promoviendo el talento, la expresión y la seguridad personal.",
    "paragraphs": [
      "Creemos que cada persona tiene capacidades que merecen ser descubiertas, fortalecidas y proyectadas. La formación es una herramienta fundamental para desarrollar la confianza, la expresión y las habilidades que permiten abrir nuevos caminos.",
      "A través de nuestra vinculación con CORPS MODEL, participamos en espacios de formación dirigidos a modelos jóvenes y adultos, apoyando procesos de aprendizaje en áreas como modelaje, oratoria, dicción y maquillaje.",
      "Estos espacios van más allá de la preparación para una pasarela. Buscan fortalecer la seguridad personal, la comunicación, la expresión corporal y la capacidad de desenvolverse con confianza en diferentes escenarios.",
      "Nos interesa acompañar a quienes están construyendo sus sueños, brindándoles herramientas que contribuyan a su crecimiento y desarrollo personal."
    ],
    "commitment": "Apoyar procesos de formación, motivar nuevos talentos y promover espacios donde jóvenes y adultos puedan reconocer sus capacidades y desarrollar sus habilidades.",
    "closing": "Porque cada talento merece una oportunidad para brillar."
  },
  {
    "title": "REINAS QUE DEJAN HUELLA",
    "tagline": "Una corona representa mucho más cuando se convierte en una oportunidad para ayudar.",
    "summary": "Nos unimos a iniciativas que identifican problemáticas sociales en Antioquia, buscando oportunidades para contribuir a las comunidades mediante el liderazgo femenino y el trabajo colaborativo.",
    "paragraphs": [
      "Creemos que el liderazgo femenino también tiene un compromiso con las comunidades. Ser representante significa tener la posibilidad de utilizar la voz, la visibilidad y las experiencias para reconocer realidades que muchas veces necesitan mayor atención.",
      "Reinas que Dejan Huella es una iniciativa que busca identificar diferentes problemáticas sociales en el departamento de Antioquia y promover acciones que permitan contribuir a su atención.",
      "Desde este espacio se busca conectar representantes, mujeres líderes, organizaciones y personas comprometidas con el bienestar de sus territorios, generando oportunidades para trabajar conjuntamente por causas que necesitan apoyo.",
      "Nos inspira la idea de que cada mujer puede convertirse en una agente de cambio desde sus capacidades, su historia y su compromiso con los demás."
    ],
    "commitment": "Promover el liderazgo femenino con sentido social, visibilizar las necesidades de las comunidades y sumar esfuerzos para impulsar iniciativas que dejen huellas positivas.",
    "closing": "Porque el verdadero legado de una reina no está solamente en la corona, sino en las vidas que puede inspirar y las causas que decide acompañar."
  }
];

// ==========================================================================
// Página de cada causa con el diseño final.
// FUNDAYAMA tiene diseño cinematográfico propio; las demás son de lectura normal.
// ==========================================================================
(() => {
 const root = document.documentElement;
 const main = document.getElementById('cause');
 const id = Number(new URLSearchParams(location.search).get('proyecto'));
 const project = projects[id - 1];
 const meta = {
  1: { folder: 'fundayama', files: ['foto-04', 'foto-01', 'foto-02', 'foto-03', 'foto-05', 'foto-06', 'actividad-05'] },
  2: { folder: 'identidad-despierta', photos: [1, 3, 4, 5] },
  3: { folder: 'corps-model', photos: [1, 2, 3, 4, 5] },
  4: { folder: 'reinas-que-dejan-huella', photos: [1, 2, 3] }
 };
 const esc = text => String(text).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
 // Resalta en degradé las últimas palabras de una frase.
 const gradEnd = (text, n = 2) => { const w = esc(text).split(' '); const tail = w.splice(-n).join(' '); return `${w.join(' ')} <span class="grad">${tail}</span>`; };

 if (!project) {
  root.classList.add('simple');
  main.innerHTML = `<section class="hero-simple compact"><span class="eyebrow">Nuestro trabajo</span><h1>Proyecto no <span class="grad">encontrado.</span></h1><p>Regresa a Nuestro trabajo para explorar las causas.</p><div class="actions"><a class="btn btn-light" href="trabajo/#causas">Ver las causas</a></div></section>`;
  return;
 }

 const m = meta[id];
 const num = String(id).padStart(2, '0');
 const photos = m.files
  ? m.files.map(f => `assets/${m.folder}/${f}.webp`)
  : m.photos.map(n => `assets/${m.folder}/actividad-${String(n).padStart(2, '0')}.webp?v=2`);
 const title = esc(project.title);
 document.title = `${project.title} · Más allá de nosotros`;
 const credit = `<figcaption class="photo-credit"><span>Causa</span> ${title}</figcaption>`;
 const join = `<div class="actions"><a class="btn btn-light" href="proposito/">Súmate a esta causa</a><a class="btn btn-glass" href="trabajo/#causas">Ver otras causas</a></div>`;
 // Galería uniforme: todas las fotos del mismo tamaño.
 const gallery = cine => `<div class="gallery-grid count-${photos.length}${cine ? ' cine' : ''}"${cine ? '' : ' data-group'}>${photos.map((src, i) =>
  `<button class="tile g-item" type="button" data-src="${src}"${cine ? ' data-fx' : ''} aria-label="Ver fotografía ${i + 1} de ${photos.length}"><img src="${src}" alt="Actividades de ${title}, fotografía ${i + 1} de ${photos.length}" loading="lazy"></button>`).join('')}</div>`;

 // Todas las causas usan el mismo diseño de lectura; FUNDAYAMA lleva su rosa.
 if (id === 1) root.classList.add('cause-1');
 const heroPhoto = id === 1 ? 'assets/portada.jpg' : photos[0];
 {
  root.classList.add('simple');
  main.innerHTML = `
 <section class="page-hero wrap" aria-label="${title}">
  <div class="ph-copy">
   <span class="eyebrow">Nuestro trabajo · Causa ${num}</span>
   <h1>${title}</h1>
   <p>${esc(project.tagline)}</p>
   ${join}
  </div>
  <figure class="ph-media"><img src="${heroPhoto}" alt="Actividad de ${title}" style="object-position:center 30%">${credit}</figure>
 </section>

 <section class="wrap block read-split" aria-label="Sobre esta causa">
  <header class="read-head reveal">
   <span class="eyebrow">Un propósito que nos conecta</span>
   <h2>Sobre esta <span class="grad">causa.</span></h2>
   <p>${esc(project.paragraphs[0])}</p>
  </header>
  <div class="read-col reveal">
   ${project.paragraphs.slice(1).map(text => `<p>${esc(text)}</p>`).join('')}
   <div class="commit-line"><span class="eyebrow">Nuestro compromiso</span><p>${esc(project.commitment)}</p></div>
  </div>
  <div class="slider reveal" aria-roledescription="carrusel" aria-label="Fotografías de ${title}">
   <div class="slides">${photos.map((src, i) => `<button class="slide${i ? '' : ' on'}" type="button" data-src="${src}" aria-label="Ver fotografía ${i + 1} en grande"${i ? ' tabindex="-1"' : ''}><img src="${src}" alt="Actividades de ${title}, fotografía ${i + 1} de ${photos.length}"${i ? ' loading="lazy"' : ''}></button>`).join('')}</div>
   <div class="slider-ctrl">
    <button class="arrow prev" type="button" aria-label="Fotografía anterior"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
    <span class="count" aria-live="polite">1 / ${photos.length}</span>
    <button class="arrow next" type="button" aria-label="Fotografía siguiente"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
   </div>
  </div>
 </section>

 <section class="closing wrap reveal quote-block" aria-label="Sigamos sumando">
  <blockquote>“${esc(project.closing)}”</blockquote>
  <p class="support"><b>Sigamos sumando.</b> ¿Quieres ser parte de estas iniciativas?</p>
  ${join}
 </section>`;
 }

 // Visor con flechas, teclado y deslizamiento táctil.
 document.querySelectorAll('.slider').forEach(slider => {
  const slides = [...slider.querySelectorAll('.slide')];
  const count = slider.querySelector('.count');
  let index = 0;
  const show = next => {
   const dir = next > index ? 1 : -1;
   index = (next + slides.length) % slides.length;
   slides.forEach((slide, i) => {
    slide.classList.toggle('on', i === index);
    slide.tabIndex = i === index ? 0 : -1;
    slide.style.setProperty('--dir', dir);
   });
   count.textContent = `${index + 1} / ${slides.length}`;
  };
  slider.querySelector('.prev').addEventListener('click', () => show(index - 1));
  slider.querySelector('.next').addEventListener('click', () => show(index + 1));
  slider.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(index - 1); if (e.key === 'ArrowRight') show(index + 1); });
  let x0 = null;
  slider.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1)); x0 = null; }, { passive: true });
 });

 // Ver cada fotografía en grande.
 const box = document.querySelector('.lightbox');
 const boxImg = box?.querySelector('img');
 document.querySelectorAll('.g-item, .slide').forEach(item => item.addEventListener('click', () => {
  if (!box) return;
  boxImg.src = item.dataset.src; boxImg.alt = item.querySelector('img').alt;
  box.showModal();
 }));
 box?.addEventListener('click', () => box.close());
})();
