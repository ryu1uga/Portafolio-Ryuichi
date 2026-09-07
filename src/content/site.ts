export type Lang = 'es' | 'en' | 'ja';

export interface Entry {
  period: string;
  title: string;
  org: string;
  place?: string;
  notes?: string[];
}

export interface Project {
  name: string;
  context: string;
  summary: string;
  stack: string[];
  link?: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface SiteContent {
  meta: { title: string; description: string };
  nav: { about: string; stack: string; experience: string; projects: string; education: string; contact: string };
  hero: {
    name: string;
    nameJa: string;
    role: string;
    intro: string;
    location: string;
  };
  about: { title: string; body: string[]; languages: { name: string; level: string }[] };
  stack: { title: string; lead: string; groups: StackGroup[] };
  experience: { title: string; entries: Entry[] };
  projects: { title: string; lead: string; lab: Project[]; personal: Project[]; labLabel: string; personalLabel: string };
  education: { title: string; entries: Entry[]; certsTitle: string; certs: string[] };
  contact: { title: string; lead: string; email: string; github: string; linkedin: string; emailLabel: string };
  ui: { overline: string; copy: string; copied: string; theme: string; lima: string; tokyo: string; scroll: string; writeMe: string };
  footer: string;
}

const links = {
  email: '20211953@aloe.ulima.edu.pe',
  github: 'https://github.com/ryu1uga',
  linkedin: 'https://www.linkedin.com/in/ryuichi-oshiro-ugamoto-484006290/',
};

const stackGroups = {
  es: [
    { label: 'Backend', items: ['C# / .NET', 'Python / FastAPI', 'Kotlin / Spring Boot', 'TypeScript / Node.js'] },
    { label: 'Datos e infraestructura', items: ['PostgreSQL', 'Docker', 'OpenShift', 'Git', 'Gradle'] },
    { label: 'Frontend y móvil', items: ['React', 'React Native / Expo', 'Three.js'] },
    { label: 'Herramientas', items: ['Claude Code', 'MCP', 'Photoshop', 'InDesign'] },
  ],
  en: [
    { label: 'Backend', items: ['C# / .NET', 'Python / FastAPI', 'Kotlin / Spring Boot', 'TypeScript / Node.js'] },
    { label: 'Data and infrastructure', items: ['PostgreSQL', 'Docker', 'OpenShift', 'Git', 'Gradle'] },
    { label: 'Frontend and mobile', items: ['React', 'React Native / Expo', 'Three.js'] },
    { label: 'Tools', items: ['Claude Code', 'MCP', 'Photoshop', 'InDesign'] },
  ],
  ja: [
    { label: 'バックエンド', items: ['C# / .NET', 'Python / FastAPI', 'Kotlin / Spring Boot', 'TypeScript / Node.js'] },
    { label: 'データ・インフラ', items: ['PostgreSQL', 'Docker', 'OpenShift', 'Git', 'Gradle'] },
    { label: 'フロントエンド・モバイル', items: ['React', 'React Native / Expo', 'Three.js'] },
    { label: 'ツール', items: ['Claude Code', 'MCP', 'Photoshop', 'InDesign'] },
  ],
};

export const content: Record<Lang, SiteContent> = {
  es: {
    meta: {
      title: 'Ryuichi Oshiro Ugamoto — Desarrollador backend',
      description:
        'Desarrollador backend (.NET, Spring Boot, FastAPI, Node.js) y estudiante de Ingeniería de Sistemas en la Universidad de Lima. Practicante en ITLAB.',
    },
    nav: { about: 'Sobre mí', stack: 'Stack', experience: 'Experiencia', projects: 'Proyectos', education: 'Formación', contact: 'Contacto' },
    hero: {
      name: 'Ryuichi Oshiro Ugamoto',
      nameJa: '宇賀本 竜一',
      role: 'Desarrollador backend y estudiante de Ingeniería de Sistemas',
      intro:
        'Construyo APIs y servicios en .NET, Spring Boot, FastAPI y Node.js. Practicante en ITLAB, el laboratorio de innovación de la Universidad de Lima, desde agosto de 2024.',
      location: 'Lima, Perú',
    },
    about: {
      title: 'Sobre mí',
      body: [
        'Crecí entre Perú y Japón: hice la primaria en Sagamihara y terminé el colegio en Lima. Esa doble base me dio dos idiomas nativos y una forma de trabajar ordenada y directa.',
        'En ITLAB desarrollo el backend de proyectos reales para la universidad: modelado de datos en PostgreSQL, APIs REST y despliegue en contenedores. Fuera del laboratorio hago apps móviles como Atlas Quest, un globo 3D para aprender geografía, e investigo juegos serios como línea de tesis.',
        'Me interesa el desarrollo de software con criterio: código legible, bases de datos bien diseñadas y herramientas de IA agéntica integradas al flujo de trabajo.',
      ],
      languages: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Japonés', level: 'Nativo, JLPT N2' },
        { name: 'Inglés', level: 'Intermedio alto, Advanced Level Británico' },
      ],
    },
    stack: {
      title: 'Stack',
      lead: 'Trabajo sobre todo en backend. Lo que aparece aquí es lo que uso en proyectos, no una lista de cursos.',
      groups: stackGroups.es,
    },
    experience: {
      title: 'Experiencia',
      entries: [
        {
          period: 'ago. 2024 — actualidad',
          title: 'Practicante backend',
          org: 'ITLAB, Universidad de Lima',
          place: 'Lima',
          notes: [
            'Desarrollo de APIs y servicios para proyectos del laboratorio: Grados y Títulos, Pulmochip y CorrePalabras.',
            'Modelado de datos en PostgreSQL, contenerización con Docker, despliegue en OpenShift y trabajo en equipo con Git.',
            'Apoyo en la operación del programa de practicantes: planes de aprendizaje y onboarding.',
          ],
        },
        {
          period: 'ene. 2024 — jul. 2024',
          title: 'Atención al cliente',
          org: 'Teleperformance',
          place: 'Callao',
          notes: ['Servicio de atención al cliente. Comunicación clara bajo presión y manejo de casos.'],
        },
        {
          period: 'ene. 2019 — feb. 2019',
          title: 'Becado',
          org: 'JICA — Japan International Cooperation Agency',
          place: 'Yokohama, Japón',
          notes: ['Programa de un mes sobre cultura japonesa y nikkei, con participantes de distintos países.'],
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      lead: 'Una selección de trabajo en el laboratorio y proyectos propios. Los de ITLAB viven en un GitLab privado, así que no tienen enlace público.',
      labLabel: 'En ITLAB',
      personalLabel: 'Personales',
      lab: [
        {
          name: 'Grados y Títulos',
          context: 'ITLAB · repositorio privado',
          summary:
            'Validación automática del expediente de grados y títulos de la Universidad de Lima. La secretaría sube seis documentos (RENIEC, SUNEDU, acta de sustentación, autorización, tesis y reporte Turnitin) en PDF o Word; el sistema cruza quince verificaciones y devuelve un semáforo por bachiller, con cada alerta citando el archivo y la página de donde salió el dato. Hice el backend completo: lectura de PDF y DOCX con pdfplumber y OCR de respaldo para las actas escaneadas, un extractor por documento, el motor de reglas que compara nombres respetando la convención de escritura de cada formato, y una suite de pruebas con expedientes sintéticos generados a propósito.',
          stack: ['FastAPI', 'Python', 'pdfplumber', 'OCR', 'Docker'],
        },
        {
          name: 'Pulmochip',
          context: 'ITLAB · repositorio privado',
          summary:
            'Plataforma web para monitorear condiciones laborales que afectan la salud ocupacional, con datos recogidos por dispositivos integrados en respiradores. Hice el backend: la API REST y el modelo de datos en PostgreSQL para cuatro roles con permisos distintos (administrador, operador, Draeger y cliente), la gestión de contratos, dispositivos y emparejamiento de sensores, y las consultas que alimentan los reportes por contrato, actividad y trabajador.',
          stack: ['.NET', 'PostgreSQL', 'API REST'],
        },
        {
          name: 'CorrePalabras',
          context: 'ITLAB · repositorio privado',
          summary:
            'Aplicación móvil para que niños de 4.º, 5.º y 6.º de primaria mejoren su comprensión lectora: cuentos que se descargan en español o en quechua y luego se leen sin conexión, con las palabras desplazándose más rápido cuantos más toques da el niño, y actividades interactivas para reforzar cada cuento leído. Se completa con un panel de administración (cuentos, avatares) y una web informativa. Hice el backend: API en .NET con PostgreSQL 16 desplegada en el clúster OpenShift de ITLAB, con volumen persistente, secretos y configuración exclusivamente por variables de entorno, sin credenciales en el código.',
          stack: ['.NET', 'PostgreSQL', 'OpenShift', 'Docker'],
        },
      ],
      personal: [
        {
          name: 'Atlas Quest',
          context: 'App móvil',
          summary:
            'App para aprender los 195 países: banderas, capitales y ubicación sobre un globo 3D construido a mano con three.js y expo-gl. La geografía viaja dentro del bundle como una máscara comprimida de 75 KB, así que funciona sin red, sin cuentas y sin servidores. Seis modos de juego, repetición espaciada, 1170 estrellas por coleccionar y 111 tests sobre la lógica pura.',
          stack: ['React Native', 'Expo', 'Three.js', 'TypeScript'],
          link: 'https://github.com/ryu1uga/Atlas-Quest',
        },
        {
          name: 'NotaFlow',
          context: 'App móvil',
          summary: 'Calculadora de notas para universidades peruanas, pensada para distribución en tiendas.',
          stack: ['React Native'],
          link: 'https://github.com/ryu1uga/Notaflow-Mobile',
        },
        {
          name: 'Juego serio sobre derechos laborales',
          context: 'Investigación',
          summary:
            'Propuesta de investigación para tesis: un juego serio que enseña la Ley 28518 a practicantes preprofesionales, con evaluación pre/post y análisis ANCOVA.',
          stack: ['Diseño de juegos serios', 'Metodología'],
        },
      ],
    },
    education: {
      title: 'Formación',
      entries: [
        { period: '2021 — 2026', title: 'Ingeniería de Sistemas', org: 'Universidad de Lima' },
        { period: '2018 — 2020', title: 'Advanced Level, inglés', org: 'Asociación Cultural Peruano Británica' },
        { period: '2013 — 2020', title: 'Secundaria', org: 'Colegio Peruano Japonés La Victoria' },
        { period: '2009 — 2013', title: 'Primaria', org: '相模原市立二本松小学校, Sagamihara, Japón' },
      ],
      certsTitle: 'Certificaciones',
      certs: ['JLPT N2', 'Advanced Level of English, Británico', 'Adobe ACA en diseño visual con Photoshop', 'Adobe ACA en medios impresos y digitales con InDesign'],
    },
    contact: {
      title: 'Contacto',
      lead: 'Abierto a prácticas y posiciones junior en backend. Respondo en español, inglés o japonés.',
      emailLabel: 'Correo',
      ...links,
    },
    ui: { overline: 'Backend · Lima ⇄ Sagamihara', copy: 'Copiar', copied: 'Copiado', theme: 'Cambiar tema', lima: 'Lima', tokyo: 'Tokio', scroll: 'Bajar', writeMe: 'Escríbeme' },
    footer: 'Hecho con Astro y React.',
  },

  en: {
    meta: {
      title: 'Ryuichi Oshiro Ugamoto — Backend developer',
      description:
        'Backend developer (.NET, Spring Boot, FastAPI, Node.js) and Systems Engineering student at Universidad de Lima. Intern at ITLAB.',
    },
    nav: { about: 'About', stack: 'Stack', experience: 'Experience', projects: 'Projects', education: 'Education', contact: 'Contact' },
    hero: {
      name: 'Ryuichi Oshiro Ugamoto',
      nameJa: '宇賀本 竜一',
      role: 'Backend developer and Systems Engineering student',
      intro:
        'I build APIs and services with .NET, Spring Boot, FastAPI and Node.js. Backend intern at ITLAB, the innovation lab of Universidad de Lima, since August 2024.',
      location: 'Lima, Peru',
    },
    about: {
      title: 'About',
      body: [
        'I grew up between Peru and Japan: elementary school in Sagamihara, high school in Lima. That gave me two native languages and a tidy, direct way of working.',
        'At ITLAB I build the backend of real projects for the university: data modelling in PostgreSQL, REST APIs and container deployments. Outside the lab I make mobile apps such as Atlas Quest, a 3D globe for learning geography, and research serious games as my thesis line.',
        'I care about software built with judgement: readable code, well-designed databases and agentic AI tooling integrated into the workflow.',
      ],
      languages: [
        { name: 'Spanish', level: 'Native' },
        { name: 'Japanese', level: 'Native, JLPT N2' },
        { name: 'English', level: 'Upper intermediate, Advanced Level at Británico' },
      ],
    },
    stack: {
      title: 'Stack',
      lead: 'Mostly backend. Everything here is what I actually use on projects, not a list of courses.',
      groups: stackGroups.en,
    },
    experience: {
      title: 'Experience',
      entries: [
        {
          period: 'Aug 2024 — present',
          title: 'Backend intern',
          org: 'ITLAB, Universidad de Lima',
          place: 'Lima',
          notes: [
            'APIs and services for lab projects: Grados y Títulos, Pulmochip and CorrePalabras.',
            'Data modelling in PostgreSQL, Docker containerisation, OpenShift deployments and team workflows with Git.',
            'Support for the intern programme: learning plans and onboarding.',
          ],
        },
        {
          period: 'Jan 2024 — Jul 2024',
          title: 'Customer service',
          org: 'Teleperformance',
          place: 'Callao',
          notes: ['Customer support. Clear communication under pressure and case handling.'],
        },
        {
          period: 'Jan 2019 — Feb 2019',
          title: 'Scholarship holder',
          org: 'JICA — Japan International Cooperation Agency',
          place: 'Yokohama, Japan',
          notes: ['One-month programme on Japanese and Nikkei culture with participants from several countries.'],
        },
      ],
    },
    projects: {
      title: 'Projects',
      lead: 'A selection of lab work and personal projects. The ITLAB ones live in a private GitLab, so they have no public link.',
      labLabel: 'At ITLAB',
      personalLabel: 'Personal',
      lab: [
        {
          name: 'Grados y Títulos',
          context: 'ITLAB · private repository',
          summary:
            'Automatic validation of the degree and diploma file at Universidad de Lima. The registrar uploads six documents (RENIEC, SUNEDU, defence record, authorisation form, thesis and Turnitin report) as PDF or Word; the system runs fifteen cross-checks and returns a traffic light per graduate, every alert citing the file and page the data came from. I built the whole backend: PDF and DOCX reading with pdfplumber plus an OCR fallback for scanned records, one extractor per document, the rule engine that compares names respecting each format’s own writing convention, and a test suite built on purpose-generated synthetic files.',
          stack: ['FastAPI', 'Python', 'pdfplumber', 'OCR', 'Docker'],
        },
        {
          name: 'Pulmochip',
          context: 'ITLAB · private repository',
          summary:
            'Web platform for monitoring working conditions that affect occupational health, with data collected by devices built into respirators. I built the backend: the REST API and the PostgreSQL data model for four roles with different permissions (admin, operator, Draeger and client), the management of contracts, devices and sensor pairing, and the queries behind the reports by contract, activity and worker.',
          stack: ['.NET', 'PostgreSQL', 'API REST'],
        },
        {
          name: 'CorrePalabras',
          context: 'ITLAB · private repository',
          summary:
            'Mobile app helping children in years 4 to 6 of primary school improve their reading: stories downloaded in Spanish or Quechua and then read offline, with the words scrolling faster the more the child taps, and interactive activities to reinforce each story. It is completed by an admin panel (stories, avatars) and an informational website. I built the backend: a .NET API with PostgreSQL 16 deployed on ITLAB’s OpenShift cluster, with a persistent volume, secrets and configuration only through environment variables, no credentials in the code.',
          stack: ['.NET', 'PostgreSQL', 'OpenShift', 'Docker'],
        },
      ],
      personal: [
        {
          name: 'Atlas Quest',
          context: 'Mobile app',
          summary:
            'App for learning the 195 countries: flags, capitals and location on a 3D globe hand-built with three.js and expo-gl. The geography ships inside the bundle as a 75 KB compressed mask, so it works with no network, no accounts and no servers. Six game modes, spaced repetition, 1,170 stars to collect and 111 tests on the pure logic.',
          stack: ['React Native', 'Expo', 'Three.js', 'TypeScript'],
          link: 'https://github.com/ryu1uga/Atlas-Quest',
        },
        { name: 'NotaFlow', context: 'Mobile app', summary: 'Grade calculator for Peruvian universities, built for store distribution.', stack: ['React Native'], link: 'https://github.com/ryu1uga/Notaflow-Mobile' },
        { name: 'Serious game on labour rights', context: 'Research', summary: 'Thesis research proposal: a serious game teaching Peru’s Law 28518 to pre-professional interns, with pre/post evaluation and ANCOVA analysis.', stack: ['Serious game design', 'Methodology'] },
      ],
    },
    education: {
      title: 'Education',
      entries: [
        { period: '2021 — 2026', title: 'Systems Engineering', org: 'Universidad de Lima' },
        { period: '2018 — 2020', title: 'Advanced Level, English', org: 'Asociación Cultural Peruano Británica' },
        { period: '2013 — 2020', title: 'High school', org: 'Colegio Peruano Japonés La Victoria' },
        { period: '2009 — 2013', title: 'Elementary school', org: 'Nihonmatsu Elementary School, Sagamihara, Japan' },
      ],
      certsTitle: 'Certifications',
      certs: ['JLPT N2', 'Advanced Level of English, Británico', 'Adobe ACA Visual Design with Photoshop', 'Adobe ACA Print and Digital Media with InDesign'],
    },
    contact: {
      title: 'Contact',
      lead: 'Open to internships and junior backend roles. I reply in Spanish, English or Japanese.',
      emailLabel: 'Email',
      ...links,
    },
    ui: { overline: 'Backend · Lima ⇄ Sagamihara', copy: 'Copy', copied: 'Copied', theme: 'Toggle theme', lima: 'Lima', tokyo: 'Tokyo', scroll: 'Scroll', writeMe: 'Write to me' },
    footer: 'Built with Astro and React.',
  },

  ja: {
    meta: {
      title: '宇賀本 竜一 — バックエンド開発者',
      description: 'バックエンド開発者（.NET、Spring Boot、FastAPI、Node.js）。リマ大学システム工学専攻、ITLAB実習生。',
    },
    nav: { about: '自己紹介', stack: '技術スタック', experience: '経歴', projects: 'プロジェクト', education: '学歴', contact: '連絡先' },
    hero: {
      name: 'Ryuichi Oshiro Ugamoto',
      nameJa: '宇賀本 竜一',
      role: 'バックエンド開発者・システム工学専攻',
      intro:
        '.NET、Spring Boot、FastAPI、Node.jsでAPIとサービスを開発しています。2024年8月よりリマ大学のイノベーション研究所ITLABでバックエンドの実習生として勤務中。',
      location: 'ペルー・リマ',
    },
    about: {
      title: '自己紹介',
      body: [
        'ペルーと日本の両方で育ちました。小学校は相模原市で、中学・高校はリマで卒業。二つの母語と、整理された率直な仕事の進め方はそこから来ています。',
        'ITLABでは大学向けの実プロジェクトのバックエンドを担当しています。PostgreSQLでのデータ設計、REST APIの開発、コンテナでのデプロイなど。研究所の外では、3D地球儀で地理を学ぶアプリ「Atlas Quest」のようなモバイルアプリを作り、卒業研究としてシリアスゲームを研究しています。',
        '読みやすいコード、よく設計されたデータベース、そしてワークフローに組み込んだエージェント型AIツール。判断力のあるソフトウェア開発を大切にしています。',
      ],
      languages: [
        { name: 'スペイン語', level: '母語' },
        { name: '日本語', level: '母語・JLPT N2' },
        { name: '英語', level: '中上級・Británico Advanced Level' },
      ],
    },
    stack: {
      title: '技術スタック',
      lead: '主にバックエンド。ここに載せているのは実際にプロジェクトで使っている技術です。',
      groups: stackGroups.ja,
    },
    experience: {
      title: '経歴',
      entries: [
        {
          period: '2024年8月 — 現在',
          title: 'バックエンド実習生',
          org: 'ITLAB、リマ大学',
          place: 'リマ',
          notes: [
            '研究所プロジェクトのAPIとサービス開発：Grados y Títulos、Pulmochip、CorrePalabras。',
            'PostgreSQLでのデータ設計、Dockerによるコンテナ化、OpenShiftへのデプロイ、Gitでのチーム開発。',
            '実習生プログラムの運営支援：学習計画とオンボーディング。',
          ],
        },
        {
          period: '2024年1月 — 7月',
          title: 'カスタマーサービス',
          org: 'Teleperformance',
          place: 'カヤオ',
          notes: ['顧客対応。プレッシャー下での明確なコミュニケーションと案件処理。'],
        },
        {
          period: '2019年1月 — 2月',
          title: '研修生',
          org: 'JICA 国際協力機構',
          place: '横浜',
          notes: ['日本文化と日系文化に関する1か月のプログラム。各国からの参加者と交流。'],
        },
      ],
    },
    projects: {
      title: 'プロジェクト',
      lead: '研究所での仕事と個人プロジェクトから抜粋。ITLABのプロジェクトは非公開のGitLabにあるため、公開リンクはありません。',
      labLabel: 'ITLABにて',
      personalLabel: '個人',
      lab: [
        {
          name: 'Grados y Títulos',
          context: 'ITLAB · 非公開リポジトリ',
          summary:
            'リマ大学の学位・称号申請書類を自動検証するシステム。事務局がRENIEC、SUNEDU、口頭試問記録、公開許可書、論文、Turnitinレポートの6書類をPDFまたはWordでアップロードすると、15項目の照合を行い、学生ごとに信号機形式で結果を返す。各アラートは元のファイルとページを明示。バックエンドを全て担当：pdfplumberによるPDF・DOCXの読み取りとスキャン書類向けOCR、書類ごとの抽出器、各書式の氏名表記規則を踏まえて比較する規則エンジン、検証用に生成した合成書類のテストスイート。',
          stack: ['FastAPI', 'Python', 'pdfplumber', 'OCR', 'Docker'],
        },
        {
          name: 'Pulmochip',
          context: 'ITLAB · 非公開リポジトリ',
          summary:
            '呼吸用保護具に組み込んだデバイスで収集したデータをもとに、労働衛生に影響する労働環境を監視するWebプラットフォーム。バックエンドを担当：権限の異なる4ロール（管理者、オペレーター、Draeger、顧客）に対応するREST APIとPostgreSQLのデータモデル、契約・デバイス管理とセンサーのペアリング、契約・作業・作業者ごとのレポートを支えるクエリ。',
          stack: ['.NET', 'PostgreSQL', 'API REST'],
        },
        {
          name: 'CorrePalabras',
          context: 'ITLAB · 非公開リポジトリ',
          summary:
            '小学4〜6年生の読解力を伸ばすモバイルアプリ。物語をスペイン語またはケチュア語でダウンロードし、オフラインで読める。タップするほど文字の流れが速くなり、読んだ物語ごとにインタラクティブな練習問題で理解を確認できる。管理用の画面（物語やアバターの管理）と紹介用のWebサイトも備える。バックエンドを担当：PostgreSQL 16を使う.NET APIをITLABのOpenShiftクラスターにデプロイし、永続ボリューム、Secret、環境変数のみによる設定（コードに認証情報を含めない）を構成。',
          stack: ['.NET', 'PostgreSQL', 'OpenShift', 'Docker'],
        },
      ],
      personal: [
        {
          name: 'Atlas Quest',
          context: 'モバイルアプリ',
          summary:
            '世界195か国の国旗・首都・位置を学ぶアプリ。three.jsとexpo-glで自作した3D地球儀に、圧縮した地理マスク（75 KB）をバンドル内に埋め込んでいるため、通信もアカウントもサーバーも不要。6つのゲームモード、間隔反復、集める星1170個、純粋ロジックに対する111件のテスト。',
          stack: ['React Native', 'Expo', 'Three.js', 'TypeScript'],
          link: 'https://github.com/ryu1uga/Atlas-Quest',
        },
        { name: 'NotaFlow', context: 'モバイルアプリ', summary: 'ペルーの大学向け成績計算アプリ。ストア配布を想定。', stack: ['React Native'], link: 'https://github.com/ryu1uga/Notaflow-Mobile' },
        { name: '労働権に関するシリアスゲーム', context: '研究', summary: '卒業研究の提案。実習生にペルー法28518号を教えるシリアスゲームで、事前・事後評価とANCOVA分析を行う。', stack: ['シリアスゲーム設計', '研究方法論'] },
      ],
    },
    education: {
      title: '学歴',
      entries: [
        { period: '2021 — 2026', title: 'システム工学', org: 'リマ大学' },
        { period: '2018 — 2020', title: '英語 Advanced Level', org: 'Asociación Cultural Peruano Británica' },
        { period: '2013 — 2020', title: '中等教育', org: 'ペルー日系ラ・ビクトリア校' },
        { period: '2009 — 2013', title: '初等教育', org: '相模原市立二本松小学校' },
      ],
      certsTitle: '資格',
      certs: ['JLPT N2', 'Advanced Level of English, Británico', 'Adobe ACA ビジュアルデザイン (Photoshop)', 'Adobe ACA 印刷・デジタルメディア (InDesign)'],
    },
    contact: {
      title: '連絡先',
      lead: 'インターンシップやバックエンドのジュニアポジションを募集中。スペイン語・英語・日本語で対応します。',
      emailLabel: 'メール',
      ...links,
    },
    ui: { overline: 'バックエンド · リマ ⇄ 相模原', copy: 'コピー', copied: 'コピーしました', theme: 'テーマ切替', lima: 'リマ', tokyo: '東京', scroll: 'スクロール', writeMe: 'メールを送る' },
    footer: 'AstroとReactで作成。',
  },
};
