import { Fragment } from 'react';
import { content, type Lang, type Project } from '../content/site';

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ja', label: 'JA', name: '日本語' },
];

interface Props {
  lang: Lang;
  paths: Record<Lang, string>;
  photo: string;
  art: string;
  stroke: string;
}

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
    <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ThemeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <circle className="sun" cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <g className="rays" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
    </g>
    <path className="moon" d="M14.5 3.2a8.5 8.5 0 1 0 6.3 12.6A7 7 0 0 1 14.5 3.2z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

// Índice para escalonar animaciones desde CSS: style={{ '--i': n }}
const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

// Un <span> por carácter (los espacios quedan como texto normal).
function Chars({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) =>
        ch === ' ' ? (
          ' '
        ) : (
          <span className="ch" style={idx(start + i)} key={i}>
            {ch}
          </span>
        ),
      )}
    </>
  );
}

// Texto partido en unidades (palabras; en japonés, caracteres) que se "entintan" al hacer scroll.
function Scrub({ text, lang }: { text: string; lang: Lang }) {
  const units = lang === 'ja' ? Array.from(text) : text.split(/(\s+)/);
  return (
    <>
      {units.map((u, i) =>
        /^\s+$/.test(u) ? (
          u
        ) : (
          <span className="w" key={i}>
            {u}
          </span>
        ),
      )}
    </>
  );
}

// Japonés: se corta por palabras (Intl.Segmenter, en build) y la puntuación se queda con la palabra anterior,
// para que ningún salto de línea deje un 。 o una ー al principio.
function jaPhrases(text: string): string[] {
  const out: string[] = [];
  for (const { segment, isWordLike } of new Intl.Segmenter('ja', { granularity: 'word' }).segment(text)) {
    if (isWordLike || !out.length) out.push(segment);
    else out[out.length - 1] += segment;
  }
  return out;
}

// Titular que sube palabra a palabra desde una máscara.
function Rise({ text, lang }: { text: string; lang: Lang }) {
  const units = lang === 'ja' ? jaPhrases(text) : text.split(' ');
  return (
    <>
      {units.map((u, i) => (
        <Fragment key={i}>
          <span className="mask">
            <span style={idx(i)}>{u}</span>
          </span>
          {lang === 'ja' ? '' : ' '}
        </Fragment>
      ))}
    </>
  );
}

function Tags({ items, large }: { items: string[]; large?: boolean }) {
  return (
    <ul className={large ? 'tags large' : 'tags'} aria-label={large ? undefined : 'Stack'}>
      {items.map((s, i) => (
        <li key={s} style={idx(i)}>
          {s}
        </li>
      ))}
    </ul>
  );
}

// Cabecera de sección: título, su versión en la otra escritura y un kanji que se llena de tinta con el scroll.
function SectionHead({ title, kick, kickLang, ghost }: { title: string; kick: string; kickLang: string; ghost: string }) {
  return (
    <div className="section-head">
      <h2>
        <span className="mask">
          <span>{title}</span>
        </span>
      </h2>
      <span className="kicker" lang={kickLang}>
        {kick}
      </span>
      <span className="ghost" lang="ja" aria-hidden="true">
        {ghost}
      </span>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <li className="project-item reveal">
      <article className="project" data-tilt>
      <div className="project-head">
        <h4 className="project-name">{p.link ? <a href={p.link}>{p.name} <Arrow /></a> : p.name}</h4>
        <span className="project-context">{p.context}</span>
      </div>
      <p className="project-summary">{p.summary}</p>
      <Tags items={p.stack} />
      </article>
    </li>
  );
}

// Se renderiza en build, sin hidratación: cada idioma es una página estática.
export default function Portfolio({ lang, paths, photo, art, stroke }: Props) {
  const t = content[lang];
  // Cada título de sección lleva debajo su versión en la otra escritura: japonés en ES/EN, inglés en JA.
  const kick = lang === 'ja' ? content.en.nav : content.ja.nav;
  const kickLang = lang === 'ja' ? 'en' : 'ja';
  const kanji = Array.from(t.hero.nameJa);
  const nameWords = t.hero.name.split(' ');
  const ribbon = t.stack.groups.flatMap((g) => g.items);
  let charCount = 0;

  return (
    <div className="page">
      {/* Telón de entrada: solo se muestra en la primera visita de la sesión (html.intro, ver Base.astro). */}
      <div className="curtain-back" aria-hidden="true" />
      <div className="curtain" aria-hidden="true">
        <span className="hanko big">
          <span>宇</span>
          <span>賀</span>
          <span>本</span>
        </span>
        <i className="ring" />
      </div>

      <a className="skip" href="#about">
        {t.nav.about}
      </a>

      <header className="top">
        <a className="brand" href={paths[lang]} aria-label={t.hero.name}>
          <span className="hanko" aria-hidden="true">
            <span>宇</span>
            <span>賀</span>
            <span>本</span>
          </span>
          <span className="brand-name">Ryuichi Oshiro Ugamoto</span>
        </a>
        <nav className="nav" aria-label="Secciones">
          <a href="#about">{t.nav.about}</a>
          <a href="#stack">{t.nav.stack}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#education">{t.nav.education}</a>
          <a href="#contact">{t.nav.contact}</a>
          <i className="nav-ink" aria-hidden="true" />
        </nav>
        <div className="controls">
          <nav className="lang" aria-label="Idioma">
            {LANGS.map((l) => (
              <a key={l.code} href={paths[l.code]} hrefLang={l.code} lang={l.code} aria-label={l.name} aria-current={lang === l.code ? 'page' : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
          <button type="button" className="theme" data-theme-toggle aria-label={t.ui.theme} title={t.ui.theme}>
            <ThemeIcon />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="name">
          <div className="hero-text">
            <p className="overline" data-scramble>
              {t.ui.overline}
            </p>
            <h1 id="name" aria-label={t.hero.name}>
              {nameWords.map((w, i) => {
                const start = charCount;
                charCount += w.length;
                return (
                  <Fragment key={i}>
                    <span className="word" aria-hidden="true">
                      <Chars text={w} start={start} />
                    </span>{' '}
                  </Fragment>
                );
              })}
            </h1>
            <p className="role">{t.hero.role}</p>
            <p className="intro">{t.hero.intro}</p>
            <div className="hero-links">
              <a className="pill" data-magnet style={idx(0)} href={t.contact.github}>
                GitHub <Arrow />
              </a>
              <a className="pill" data-magnet style={idx(1)} href={t.contact.linkedin}>
                LinkedIn <Arrow />
              </a>
              <a className="pill" data-magnet style={idx(2)} href={`mailto:${t.contact.email}`}>
                {t.contact.emailLabel}
              </a>
              <span className="location" style={idx(3)}>{t.hero.location}</span>
            </div>
          </div>

          <figure className="art">
            <div className="art-frame">
              <img src={art} alt="" width={730} height={1026} decoding="async" fetchPriority="high" />
            </div>
            <div className="signature" aria-hidden="true">
              <span className="vertical">
                {kanji.map((ch, i) => (ch === ' ' ? <span className="gap" key={i} /> : <span key={i} style={idx(i)}>{ch}</span>))}
              </span>
              <span className="hanko big">
                <span>宇</span>
                <span>賀</span>
                <span>本</span>
              </span>
            </div>
            <img className="portrait" src={photo} alt={t.hero.name} width={136} height={136} loading="eager" decoding="async" />
          </figure>

          <a className="scroll-cue" href="#about" aria-hidden="true" tabIndex={-1}>
            <span>{t.ui.scroll}</span>
            <i />
          </a>
        </section>

        {/* Cinta decorativa con el stack: se desplaza sola y acelera con el scroll. */}
        <div className="ribbon" aria-hidden="true">
          <div className="ribbon-track">
            {[0, 1].map((n) => (
              <ul key={n}>
                {ribbon.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <section className="section" id="about">
          <SectionHead title={t.about.title} kick={kick.about} kickLang={kickLang} ghost="私" />
          <div className="section-body">
            <div className="prose scrub">
              {t.about.body.map((p) => (
                <p key={p}>
                  <Scrub text={p} lang={lang} />
                </p>
              ))}
            </div>
            <dl className="langs reveal">
              {t.about.languages.map((l) => (
                <Fragment key={l.name}>
                  <dt>{l.name}</dt>
                  <dd>{l.level}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" id="stack">
          <SectionHead title={t.stack.title} kick={kick.stack} kickLang={kickLang} ghost="技" />
          <div className="section-body">
            <p className="lead reveal">{t.stack.lead}</p>
            <div className="stack-grid">
              {t.stack.groups.map((g) => (
                <div className="stack-group reveal" data-spot key={g.label}>
                  <h3>{g.label}</h3>
                  <Tags items={g.items} large />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <SectionHead title={t.experience.title} kick={kick.experience} kickLang={kickLang} ghost="歴" />
          <div className="section-body">
            <ol className="timeline">
              {t.experience.entries.map((e) => (
                <li key={e.org + e.period} className="reveal">
                  <span className="when">{e.period}</span>
                  <div className="what">
                    <h3>{e.title}</h3>
                    <p className="org">
                      {e.org}
                      {e.place ? ` · ${e.place}` : ''}
                    </p>
                    {e.notes && (
                      <ul className="notes">
                        {e.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="projects">
          <SectionHead title={t.projects.title} kick={kick.projects} kickLang={kickLang} ghost="作" />
          <div className="section-body">
            <p className="lead reveal">{t.projects.lead}</p>
            {[
              { label: t.projects.labLabel, items: t.projects.lab },
              { label: t.projects.personalLabel, items: t.projects.personal },
            ].map((g) => (
              <div className="group" key={g.label}>
                <h3 className="group-title reveal">{g.label}</h3>
                <ul className="projects">
                  {g.items.map((p) => (
                    <ProjectCard p={p} key={p.name} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="education">
          <SectionHead title={t.education.title} kick={kick.education} kickLang={kickLang} ghost="学" />
          <div className="section-body">
            <ol className="timeline compact">
              {t.education.entries.map((e) => (
                <li key={e.org + e.period} className="reveal">
                  <span className="when">{e.period}</span>
                  <div className="what">
                    <h3>{e.title}</h3>
                    <p className="org">{e.org}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="group reveal">
              <h3 className="group-title">{t.education.certsTitle}</h3>
              <Tags items={t.education.certs} large />
            </div>
          </div>
        </section>

        <section className="contact" id="contact" style={{ '--stroke': `url(${stroke})` } as React.CSSProperties}>
          <div className="contact-inner">
            <span className="kicker" lang={kickLang}>{kick.contact}</span>
            <h2 aria-label={t.contact.lead}>
              <span aria-hidden="true">
                <Rise text={t.contact.lead} lang={lang} />
              </span>
            </h2>
            <div className="contact-email reveal">
              <a className="wave" href={`mailto:${t.contact.email}`} aria-label={t.contact.email}>
                <span aria-hidden="true">
                  <Chars text={t.contact.email} />
                </span>
              </a>
              <button type="button" className="copy" data-copy={t.contact.email} data-copied={t.ui.copied}>
                {t.ui.copy}
              </button>
            </div>
            <div className="contact-links reveal">
              <a className="pill" data-magnet href={t.contact.github}>
                GitHub <Arrow />
              </a>
              <a className="pill" data-magnet href={t.contact.linkedin}>
                LinkedIn <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span className="clocks">
          <span>
            {t.ui.lima} <time data-tz="America/Lima">--:--</time>
          </span>
          <span>
            {t.ui.tokyo} <time data-tz="Asia/Tokyo">--:--</time>
          </span>
        </span>
        <span>{t.footer}</span>
        <span className="foot-name">宇賀本 竜一 · Ryuichi Oshiro Ugamoto</span>
      </footer>
    </div>
  );
}
