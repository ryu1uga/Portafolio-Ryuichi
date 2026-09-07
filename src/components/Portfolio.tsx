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

function ProjectCard({ p }: { p: Project }) {
  return (
    <li className="project reveal">
      <div className="project-head">
        <h4 className="project-name">{p.link ? <a href={p.link}>{p.name} <Arrow /></a> : p.name}</h4>
        <span className="project-context">{p.context}</span>
      </div>
      <p className="project-summary">{p.summary}</p>
      <ul className="tags" aria-label="Stack">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </li>
  );
}

// Se renderiza en build, sin hidratación: cada idioma es una página estática.
export default function Portfolio({ lang, paths, photo, art, stroke }: Props) {
  const t = content[lang];
  // Cada título de sección lleva debajo su versión en la otra escritura: japonés en ES/EN, inglés en JA.
  const kick = lang === 'ja' ? content.en.nav : content.ja.nav;
  const kanji = Array.from(t.hero.nameJa);

  return (
    <div className="page">
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
            <p className="overline">{t.ui.overline}</p>
            <h1 id="name">{t.hero.name}</h1>
            <p className="role">{t.hero.role}</p>
            <p className="intro">{t.hero.intro}</p>
            <div className="hero-links">
              <a className="pill" href={t.contact.github}>
                GitHub <Arrow />
              </a>
              <a className="pill" href={t.contact.linkedin}>
                LinkedIn <Arrow />
              </a>
              <a className="pill" href={`mailto:${t.contact.email}`}>
                {t.contact.emailLabel}
              </a>
              <span className="location">{t.hero.location}</span>
            </div>
          </div>

          <figure className="art">
            <div className="art-frame">
              <img src={art} alt="" width={730} height={1026} decoding="async" fetchPriority="high" />
            </div>
            <div className="signature" aria-hidden="true">
              <span className="vertical">
                {kanji.map((ch, i) => (ch === ' ' ? <span className="gap" key={i} /> : <span key={i}>{ch}</span>))}
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

        <section className="section" id="about">
          <div className="section-head reveal">
            <h2>{t.about.title}</h2>
            <span className="kicker" lang={lang === 'ja' ? 'en' : 'ja'}>{kick.about}</span>
          </div>
          <div className="section-body">
            <div className="prose reveal">
              {t.about.body.map((p) => (
                <p key={p}>{p}</p>
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
          <div className="section-head reveal">
            <h2>{t.stack.title}</h2>
            <span className="kicker" lang={lang === 'ja' ? 'en' : 'ja'}>{kick.stack}</span>
          </div>
          <div className="section-body">
            <p className="lead reveal">{t.stack.lead}</p>
            <div className="stack-grid">
              {t.stack.groups.map((g) => (
                <div className="stack-group reveal" key={g.label}>
                  <h3>{g.label}</h3>
                  <ul className="tags large">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-head reveal">
            <h2>{t.experience.title}</h2>
            <span className="kicker" lang={lang === 'ja' ? 'en' : 'ja'}>{kick.experience}</span>
          </div>
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
          <div className="section-head reveal">
            <h2>{t.projects.title}</h2>
            <span className="kicker" lang={lang === 'ja' ? 'en' : 'ja'}>{kick.projects}</span>
          </div>
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
          <div className="section-head reveal">
            <h2>{t.education.title}</h2>
            <span className="kicker" lang={lang === 'ja' ? 'en' : 'ja'}>{kick.education}</span>
          </div>
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
              <ul className="tags large">
                {t.education.certs.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" style={{ '--stroke': `url(${stroke})` } as React.CSSProperties}>
          <div className="contact-inner reveal">
            <span className="kicker" lang={lang === 'ja' ? 'en' : 'ja'}>{kick.contact}</span>
            <h2>{t.contact.lead}</h2>
            <div className="contact-email">
              <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
              <button type="button" className="copy" data-copy={t.contact.email} data-copied={t.ui.copied}>
                {t.ui.copy}
              </button>
            </div>
            <div className="contact-links">
              <a className="pill" href={t.contact.github}>
                github.com/ryu1uga <Arrow />
              </a>
              <a className="pill" href={t.contact.linkedin}>
                linkedin.com/in/ryuichi-oshiro-ugamoto <Arrow />
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
