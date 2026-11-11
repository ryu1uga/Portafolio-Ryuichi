// Comportamiento de la página. Sin JS la página es completa; esto solo añade movimiento.
// Los estados visuales están en src/styles/motion.css; aquí se escriben clases y variables CSS.

const root = document.documentElement;
const motion = root.classList.contains('motion');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const $$ = <T extends HTMLElement>(sel: string, ctx: ParentNode = document) => [...ctx.querySelectorAll<T>(sel)];

// Base.astro retira .motion si este módulo no llega a ejecutarse (para no dejar contenido oculto).
(window as unknown as { __motion: boolean }).__motion = true;

/* ------------------------------------------------------------------ Tema */
const themeBtn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
themeBtn?.addEventListener('click', () => {
  const flip = () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    window.dispatchEvent(new Event('themechange'));
  };
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
  if (!motion || !doc.startViewTransition) return flip();
  // La tinta se extiende desde el botón.
  const r = themeBtn.getBoundingClientRect();
  root.style.setProperty('--vx', `${r.left + r.width / 2}px`);
  root.style.setProperty('--vy', `${r.top + r.height / 2}px`);
  root.classList.add('theme-vt');
  doc.startViewTransition(flip).finished.finally(() => root.classList.remove('theme-vt'));
});

/* ------------------------------------------------------------------ Telón */
const curtains = $$('.curtain, .curtain-back');
if (root.classList.contains('intro')) {
  const close = () => curtains.forEach((c) => c.classList.add('gone'));
  setTimeout(close, 2300);
  addEventListener('pointerdown', close, { once: true });
  addEventListener('keydown', close, { once: true });
}

/* ------------------------------------------------------------------ Navegación */
const header = document.querySelector<HTMLElement>('.top');
const nav = document.querySelector<HTMLElement>('.nav');
const navInk = document.querySelector<HTMLElement>('.nav-ink');
const links = $$<HTMLAnchorElement>('.nav a[href^="#"]');
let active: HTMLAnchorElement | null = null;

const inkTo = (a: HTMLAnchorElement | null) => {
  if (!navInk) return;
  if (!a) {
    navInk.style.opacity = '0';
    return;
  }
  navInk.style.opacity = '1';
  navInk.style.width = `${a.offsetWidth}px`;
  navInk.style.translate = `${a.offsetLeft}px 0`;
};

const setActive = (a: HTMLAnchorElement | null) => {
  if (a === active) return;
  active = a;
  links.forEach((l) => (l === a ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
  inkTo(a);
  // En móvil la navegación hace scroll horizontal: se mantiene a la vista el enlace activo.
  if (a && nav && nav.scrollWidth > nav.clientWidth) {
    nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.offsetWidth / 2, behavior: motion ? 'smooth' : 'auto' });
  }
};

links.forEach((a) => {
  a.addEventListener('pointerenter', () => finePointer && inkTo(a));
  a.addEventListener('pointerleave', () => finePointer && inkTo(active));
});
addEventListener('resize', () => inkTo(active));
document.fonts?.ready.then(() => inkTo(active));

const spied = links.map((a) => document.querySelector<HTMLElement>(a.hash)).filter((s): s is HTMLElement => !!s);
if (spied.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setActive(links.find((a) => a.hash === '#' + e.target.id) ?? null);
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  spied.forEach((s) => spy.observe(s));
}

/* ------------------------------------------------------------------ Aparición al entrar en pantalla */
const revealables = $$('.reveal, .section, .contact');
if (!motion || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      let n = 0;
      for (const e of entries) {
        // Visible, o ya quedó por encima del viewport (salto directo a un ancla): se muestra.
        const above = e.boundingClientRect.bottom < 0;
        if (!e.isIntersecting && !above) continue;
        const el = e.target as HTMLElement;
        // Lo que entra en el mismo lote se escalona.
        if (!above && el.classList.contains('reveal')) el.style.setProperty('--d', `${Math.min(n++, 6) * 90}ms`);
        el.classList.add('in');
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  );
  revealables.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------------ Todo lo que depende del scroll */
const art = document.querySelector<HTMLElement>('.art-frame img');
const progressed = $$('.section, .contact');
const timelines = $$('.timeline').map((el) => ({ el, items: $$(':scope > li', el) }));
const scrubs = $$('.scrub').map((el) => ({ el, words: $$('.w', el), lit: 0 }));

let scrollVelocity = 0;
let lastY = scrollY;

const onFrame = () => {
  const vh = innerHeight;
  const y = scrollY;
  scrollVelocity = y - lastY;
  lastY = y;

  header?.classList.toggle('is-stuck', y > 8);
  if (y < 120) setActive(null);

  if (!motion) return;

  const max = document.documentElement.scrollHeight - vh;
  root.style.setProperty('--scroll', (max > 0 ? clamp(y / max) : 0).toFixed(4));

  if (art && y < vh * 1.2) art.style.setProperty('--py', `${(y * -0.06).toFixed(1)}px`);

  for (const el of progressed) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    el.style.setProperty('--sp', clamp((vh - r.top) / (vh + r.height)).toFixed(3));
  }

  for (const { el, items } of timelines) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -vh || r.top > vh * 2) continue;
    const p = clamp((vh * 0.66 - r.top) / r.height);
    el.style.setProperty('--tp', p.toFixed(3));
    for (const li of items) li.classList.toggle('past', li.offsetTop <= p * r.height);
  }

  for (const s of scrubs) {
    const r = s.el.getBoundingClientRect();
    if (r.bottom < -vh || r.top > vh * 2) continue;
    const p = clamp((vh * 0.9 - r.top) / (r.height + vh * 0.3));
    const lit = Math.round(p * s.words.length);
    if (lit === s.lit) continue;
    const [from, to] = lit > s.lit ? [s.lit, lit] : [lit, s.lit];
    for (let i = from; i < to; i++) s.words[i].classList.toggle('on', lit > s.lit);
    s.lit = lit;
  }
};

let ticking = false;
const requestFrame = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    onFrame();
  });
};
addEventListener('scroll', requestFrame, { passive: true });
addEventListener('resize', requestFrame);
onFrame();

/* ------------------------------------------------------------------ Cinta del stack */
const ribbon = document.querySelector<HTMLElement>('.ribbon');
const track = document.querySelector<HTMLElement>('.ribbon-track');
if (motion && ribbon && track) {
  let x = 0;
  let dir = -1;
  let boost = 0;
  let visible = false;
  let half = 0;
  const measure = () => (half = track.scrollWidth / 2);
  measure();
  addEventListener('resize', measure);
  document.fonts?.ready.then(measure);

  const step = () => {
    if (!visible) return;
    // El scroll empuja la cinta en su dirección; después vuelve a su paso tranquilo.
    if (Math.abs(scrollVelocity) > 0.5) dir = scrollVelocity > 0 ? -1 : 1;
    boost += (Math.min(Math.abs(scrollVelocity), 60) * 0.35 - boost) * 0.12;
    scrollVelocity *= 0.9;
    x += dir * (0.6 + boost);
    if (half > 0) {
      if (x <= -half) x += half;
      if (x > 0) x -= half;
    }
    track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
    requestAnimationFrame(step);
  };
  new IntersectionObserver(([e]) => {
    const was = visible;
    visible = e.isIntersecting;
    if (visible && !was) requestAnimationFrame(step);
  }).observe(ribbon);
}

/* ------------------------------------------------------------------ Texto que se descifra desde kana */
const KANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
function scramble(el: HTMLElement, delay: number) {
  const final = el.textContent?.trim() ?? '';
  const chars = Array.from(final);
  el.setAttribute('aria-label', final);
  const start = performance.now() + delay;
  const dur = 1100;
  let last = 0;
  const tick = (now: number) => {
    const p = (now - start) / dur;
    if (p >= 1) {
      el.textContent = final;
      return;
    }
    if (now - last > 45) {
      last = now;
      const solved = Math.floor(Math.max(p, 0) * chars.length);
      el.textContent = chars.map((c, i) => (i < solved || c === ' ' || c === '·' ? c : KANA[(Math.random() * KANA.length) | 0])).join('');
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
if (motion && !root.classList.contains('quick')) {
  const t0 = parseFloat(getComputedStyle(root).getPropertyValue('--t0')) * 1000 || 0;
  $$('[data-scramble]').forEach((el) => scramble(el, t0));
}

/* ------------------------------------------------------------------ Puntero: inclinación, foco, imanes y pincel */
if (motion && finePointer) {
  // Cuadro del hero: se inclina hacia el puntero.
  const hero = document.querySelector<HTMLElement>('.hero');
  const figure = document.querySelector<HTMLElement>('.art');
  if (hero && figure && matchMedia('(min-width: 901px)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const px = e.clientX / innerWidth - 0.5;
      const py = e.clientY / innerHeight - 0.5;
      figure.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`);
      figure.style.setProperty('--rx', `${(py * -7).toFixed(2)}deg`);
    });
    hero.addEventListener('pointerleave', () => {
      figure.style.setProperty('--ry', '0deg');
      figure.style.setProperty('--rx', '0deg');
    });
  }

  // Tarjetas: foco de luz y, en proyectos, inclinación 3D.
  $$('[data-tilt], [data-spot]').forEach((el) => {
    const tilt = el.hasAttribute('data-tilt');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      if (tilt) {
        el.classList.add('tilting');
        el.style.setProperty('--ry', `${((px - 0.5) * 5).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${((0.5 - py) * 5).toFixed(2)}deg`);
      }
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('tilting');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    });
  });

  // Botones imantados.
  $$('[data-magnet]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tx', `${((e.clientX - r.left - r.width / 2) * 0.28).toFixed(1)}px`);
      el.style.setProperty('--ty', `${((e.clientY - r.top - r.height / 2) * 0.4).toFixed(1)}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tx', '0px');
      el.style.setProperty('--ty', '0px');
    });
  });

  inkTrail();
  addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch' && e.button === 0) splash(e.clientX, e.clientY, 7);
  });
}

// Trazo de pincel: grueso cuando el puntero va despacio, fino cuando corre; la cola se afina hasta desaparecer.
function inkTrail() {
  const canvas = document.createElement('canvas');
  canvas.className = 'ink';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  type Point = { x: number; y: number; t: number; w: number; start: boolean };
  const LIFE = 620;
  const pts: Point[] = [];
  let running = false;
  let color = '';

  const readColor = () => (color = getComputedStyle(root).getPropertyValue('--ink').trim() || '#888');
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  readColor();
  resize();
  addEventListener('resize', resize);
  addEventListener('themechange', readColor);

  const draw = (now: number) => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    if (!pts.length) {
      running = false;
      return;
    }
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      if (b.start) continue;
      const life = 1 - (now - b.t) / LIFE;
      if (life <= 0) continue;
      const w = b.w * life;
      ctx.lineWidth = Math.max(w, 0.5);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      // Dos cerdas sueltas a los lados para que el borde no sea limpio.
      if (w > 4) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = (-dy / len) * w * 0.62;
        const ny = (dx / len) * w * 0.62;
        ctx.lineWidth = Math.max(w * 0.14, 0.6);
        ctx.beginPath();
        ctx.moveTo(a.x + nx, a.y + ny);
        ctx.lineTo(b.x + nx, b.y + ny);
        ctx.moveTo(a.x - nx * 0.85, a.y - ny * 0.85);
        ctx.lineTo(b.x - nx * 0.85, b.y - ny * 0.85);
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  };

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch') return;
      const now = performance.now();
      const last = pts[pts.length - 1];
      let w = 6;
      let start = true;
      if (last && now - last.t < 140) {
        const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        if (dist < 2.5) return;
        const speed = dist / Math.max(now - last.t, 1);
        w = last.w + (clamp(17 - speed * 6.5, 2.5, 17) - last.w) * 0.22;
        start = false;
      }
      pts.push({ x: e.clientX, y: e.clientY, t: now, w, start });
      if (!running) {
        running = true;
        requestAnimationFrame(draw);
      }
    },
    { passive: true },
  );
}

// Salpicadura bermellón.
function splash(x: number, y: number, n: number) {
  for (let i = 0; i < n; i++) {
    const d = document.createElement('span');
    d.className = 'drop';
    const size = 3 + Math.random() * 6;
    const ang = Math.random() * Math.PI * 2;
    const dist = 18 + Math.random() * 46;
    d.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px`;
    document.body.append(d);
    d.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.9 },
        { transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist}px)) scale(0.2)`, opacity: 0 },
      ],
      { duration: 450 + Math.random() * 350, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
    ).onfinish = () => d.remove();
  }
}

/* ------------------------------------------------------------------ Copiar correo */
$$<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const label = btn.textContent;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy || '');
    } catch {
      return;
    }
    btn.textContent = btn.dataset.copied || label;
    btn.classList.add('done');
    if (motion) {
      const r = btn.getBoundingClientRect();
      splash(r.left + r.width / 2, r.top + r.height / 2, 12);
    }
    setTimeout(() => {
      btn.textContent = label;
      btn.classList.remove('done');
    }, 1600);
  });
});

/* ------------------------------------------------------------------ Cambio de idioma: se conserva la altura de lectura */
$$<HTMLAnchorElement>('.lang a').forEach((a) => {
  a.addEventListener('click', () => {
    try {
      const max = document.documentElement.scrollHeight - innerHeight;
      sessionStorage.setItem('keep-scroll', max > 0 ? String(scrollY / max) : '0');
    } catch {}
  });
});

/* ------------------------------------------------------------------ Relojes Lima / Tokio */
const clocks = $$('[data-tz]');
if (clocks.length) {
  const tick = () => {
    const now = new Date();
    clocks.forEach((el) => {
      el.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz }).format(now);
    });
  };
  tick();
  setInterval(tick, 15000);
}
