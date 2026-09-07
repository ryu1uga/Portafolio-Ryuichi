import { Fragment } from 'react';
import { content, type Lang } from '../content/site';

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ja', label: 'JA', name: '日本語' },
];

interface Props {
  lang: Lang;
  paths: Record<Lang, string>;
  photo: string;
}

// Se renderiza en build, sin hidratación: cada idioma es una página estática.
export default function Portfolio({ lang, paths, photo }: Props) {
  const t = content[lang];

  return (
    <div className="page">
      <header className="top">
        <nav className="nav" aria-label="Secciones">
          <a href="#about">{t.nav.about}</a>
          <a href="#stack">{t.nav.stack}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#education">{t.nav.education}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <nav className="lang" aria-label="Idioma">
          {LANGS.map((l) => (
            <a key={l.code} href={paths[l.code]} hrefLang={l.code} lang={l.code} aria-label={l.name} aria-current={lang === l.code ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero">
          <img src={photo} alt={t.hero.name} width={136} height={136} />
          <div>
            <h1>{t.hero.name}</h1>
            <p className="role">{t.hero.role}</p>
            <p className="intro">{t.hero.intro}</p>
            <p className="meta">
              <span>{t.hero.location}</span>
              <a href={t.contact.github}>GitHub</a>
              <a href={t.contact.linkedin}>LinkedIn</a>
              <a href={`mailto:${t.contact.email}`}>{t.contact.emailLabel}</a>
            </p>
          </div>
          <div className="seal" aria-hidden="true">
            <span className="vertical">
              {Array.from(t.hero.nameJa).map((ch, i) =>
                ch === ' ' ? <span className="gap" key={i} /> : <span key={i}>{ch}</span>,
              )}
            </span>
            <span className="hanko">
              <span>大</span>
              <span>城</span>
            </span>
          </div>
        </section>

        <section className="section" id="about">
          <h2>{t.about.title}</h2>
          <div className="prose">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="rows">
            {t.about.languages.map((l) => (
              <Fragment key={l.name}>
                <dt>{l.name}</dt>
                <dd>{l.level}</dd>
              </Fragment>
            ))}
          </dl>
        </section>

        <section className="section" id="stack">
          <h2>{t.stack.title}</h2>
          <p className="lead">{t.stack.lead}</p>
          <dl className="rows">
            {t.stack.groups.map((g) => (
              <Fragment key={g.label}>
                <dt>{g.label}</dt>
                <dd>
                  <ul className="chips">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </Fragment>
            ))}
          </dl>
        </section>

        <section className="section" id="experience">
          <h2>{t.experience.title}</h2>
          <ul className="timeline">
            {t.experience.entries.map((e) => (
              <li key={e.org + e.period}>
                <span className="when">{e.period}</span>
                <div>
                  <h3>{e.title}</h3>
                  <p className="org">
                    {e.org}
                    {e.place ? `, ${e.place}` : ''}
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
          </ul>
        </section>

        <section className="section" id="projects">
          <h2>{t.projects.title}</h2>
          <p className="lead">{t.projects.lead}</p>
          {[
            { label: t.projects.labLabel, items: t.projects.lab },
            { label: t.projects.personalLabel, items: t.projects.personal },
          ].map((g) => (
            <div className="group" key={g.label}>
              <h3>{g.label}</h3>
              <ul className="projects">
                {g.items.map((p) => (
                  <li className="project" key={p.name}>
                    <div>
                      <div className="name">{p.link ? <a href={p.link}>{p.name}</a> : p.name}</div>
                      <div className="context">{p.context}</div>
                    </div>
                    <div>
                      <p>{p.summary}</p>
                      <p className="stack">
                        {p.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="section" id="education">
          <h2>{t.education.title}</h2>
          <ul className="timeline">
            {t.education.entries.map((e) => (
              <li key={e.org + e.period}>
                <span className="when">{e.period}</span>
                <div>
                  <h3>{e.title}</h3>
                  <p className="org">{e.org}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="group">
            <h3>{t.education.certsTitle}</h3>
            <ul className="chips">
              {t.education.certs.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="contact">
          <h2>{t.contact.title}</h2>
          <p className="lead">{t.contact.lead}</p>
          <dl className="contact-list">
            <dt>{t.contact.emailLabel}</dt>
            <dd>
              <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
            </dd>
            <dt>GitHub</dt>
            <dd>
              <a href={t.contact.github}>github.com/ryu1uga</a>
            </dd>
            <dt>LinkedIn</dt>
            <dd>
              <a href={t.contact.linkedin}>ryuichi-oshiro-ugamoto</a>
            </dd>
          </dl>
        </section>
      </main>

      <footer>{t.footer}</footer>
    </div>
  );
}
