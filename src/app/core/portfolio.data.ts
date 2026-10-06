/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file to make the portfolio yours — nothing else needs to change.
 */

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly items: readonly string[];
}

export interface Experience {
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly summary: string;
  readonly achievements: readonly string[];
  readonly stack: readonly string[];
}

export interface Project {
  readonly name: string;
  readonly subtitle: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly highlights: readonly string[];
  readonly demo?: string;
  readonly repo?: string;
  readonly icon: 'grid' | 'pulse' | 'box' | 'chart' | 'cart' | 'terminal';
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly id: string;
  readonly year: string;
  readonly credential: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export const PROFILE = {
  name: 'Mominul Islam',
  initials: 'MI',
  role: 'Full-Stack Software Engineer',
  title: 'Full-Stack Software Engineer | .NET • Angular • SQL Server',
  tagline:
    'I design and build scalable, maintainable web applications — clean APIs in ASP.NET Core, reactive interfaces in Angular, and SQL Server databases tuned to stay fast under load.',
  email: 'fazlamijotosob@gmail.com',
  phone: '01701008038',
  location: 'Dhaka, Bangladesh · Remote-friendly',
  github: 'https://github.com/alexcarter',
  linkedin: 'https://www.linkedin.com/in/alexcarter',
  twitter: 'https://twitter.com/alexcarterdev',
  resumeUrl: 'assets/Alex-Carter-CV.pdf',
  availableForWork: true,
} as const;

/**
 * EmailJS — real form delivery to your inbox, with no backend to host.
 *
 * Setup (about 5 minutes, free tier = 200 emails/month):
 *   1. Sign up at https://dashboard.emailjs.com
 *   2. Add an email service (Gmail) → copy the **Service ID**.
 *   3. Create a template:
 *        To Email : fazlamijotosob@gmail.com
 *        From     : {{from_name}}  <{{reply_to}}>
 *        Subject  : {{subject}}
 *        Body     : {{message}}
 *      → copy the **Template ID**.
 *   4. Account → General → copy the **Public Key**.
 *   5. Paste all three below.
 *   6. (Recommended) Account → Security → add the **Allowed origins** domain so
 *      the key can only be used from your deployed site.
 *
 * Until all three are filled in, the form falls through to FormSubmit below.
 */
export const EMAILJS = {
  serviceId: '',
  templateId: '',
  publicKey: '',
} as const;

/**
 * FormSubmit — the zero-signup delivery backend (https://formsubmit.co).
 *
 * This is what makes the contact form work out of the box: no account, no API
 * key, no server to host. Submissions POST to
 * `https://formsubmit.co/ajax/<PROFILE.email>` and get emailed to your inbox.
 *
 * ONE-TIME ACTIVATION
 *   The first submission to a new address triggers a confirmation email to
 *   `PROFILE.email` with an **"Activate Form"** link. Click it once and every
 *   later submission is delivered. Until then the endpoint answers
 *   `success: "false"` with a "needs Activation" message — the form treats
 *   that as a failure, so it never claims a message was sent when it wasn't.
 *
 * Delivery priority in `ContactComponent`:
 *   1. EmailJS   — if all three keys above are filled in (finer control)
 *   2. FormSubmit — if `enabled` is true
 *   3. mailto:   — last resort; opens the visitor's own mail client
 */
export const FORMSUBMIT = {
  enabled: true,
} as const;

export const STATS: readonly Stat[] = [
  { value: '7+', label: 'Years of experience' },
  { value: '40+', label: 'Projects delivered' },
  { value: '30+', label: 'Web APIs shipped' },
  { value: '99.9%', label: 'Uptime maintained' },
];

export const ABOUT = {
  summary: [
    'I am a full-stack software engineer with 7+ years of experience designing, building and shipping production web applications across fintech, healthcare and logistics.',
    'My day-to-day work lives in ASP.NET Core Web APIs, Angular front ends and SQL Server databases — from modelling the schema and writing the stored procedures, to the reactive UI that sits on top.',
    'I care about the parts that age well: clear boundaries between layers, queries that stay fast as data grows, and code a teammate can read six months later without a meeting.',
    'Most recently I have focused on decomposing legacy systems into modular services and giving product teams a shared Angular component library so features ship faster with less duplication.',
  ],
  interests: ['Clean architecture', 'Query tuning', 'Design systems', 'Developer tooling', 'Mentoring'],
} as const;

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    items: ['C#', 'ASP.NET Core', 'Web API', 'Entity Framework Core', 'REST', 'Microservices', 'SignalR', 'MediatR'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    items: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Angular Material', 'NgRx', 'Reactive Forms'],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'database',
    items: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Query Optimization', 'Indexing', 'Execution Plans', 'EF Migrations'],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    icon: 'tool',
    items: ['Git', 'Azure DevOps', 'Azure', 'Docker', 'IIS', 'Visual Studio', 'GitHub Actions', 'SonarQube'],
  },
];

export const EXPERIENCE: readonly Experience[] = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Nexa Digital Solutions',
    location: 'Cairo, EG',
    period: 'Jan 2022 — Present',
    summary:
      'Tech lead for a cross-functional squad delivering a SaaS platform used by 60k+ monthly users.',
    achievements: [
      'Reduced average API response time by 40% by profiling EF Core queries, replacing N+1 includes with projected DTOs and adding covering indexes on the hottest tables.',
      'Led the migration of a legacy ASP.NET WebForms monolith to a modular ASP.NET Core application, cutting deployment time from 45 minutes to 8 minutes.',
      'Built a shared Angular component library adopted by 4 product teams, removing an estimated 30% of duplicated UI code.',
    ],
    stack: ['ASP.NET Core', 'Angular', 'SQL Server', 'Azure', 'Docker'],
  },
  {
    role: '.NET Developer',
    company: 'Brightlayer Technologies',
    location: 'Remote',
    period: 'Sep 2019 — Dec 2021',
    summary:
      'Owned the API and reporting layer for a logistics platform serving 120k requests per day.',
    achievements: [
      'Delivered 30+ RESTful Web APIs with JWT authentication and role-based authorization, sustaining 99.9% uptime across 6 Angular applications.',
      'Rewrote reporting stored procedures and redesigned the indexing strategy, taking a 40-second executive report down to under 3 seconds.',
      'Introduced automated integration tests in CI, dropping regression bugs reaching production by roughly 60%.',
    ],
    stack: ['C#', 'ASP.NET Web API', 'Angular', 'SQL Server', 'Azure DevOps'],
  },
  {
    role: 'Junior Software Developer',
    company: 'Corebridge Software',
    location: 'Alexandria, EG',
    period: 'Jul 2017 — Aug 2019',
    summary:
      'Full-stack developer on a route-optimisation product used by 200+ client companies.',
    achievements: [
      'Developed and maintained ASP.NET MVC modules and Razor views for the core booking workflow.',
      'Raised automated test coverage from 35% to 78% by introducing unit and integration test projects across the solution.',
      'Automated database releases with SQL Server DACPACs, removing manual deployment steps and failed-release rollbacks.',
    ],
    stack: ['ASP.NET MVC', 'C#', 'SQL Server', 'JavaScript'],
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: 'TaskFlow',
    subtitle: 'Collaborative work management SaaS',
    description:
      'A multi-tenant task and sprint platform with real-time board updates, granular permissions and a reporting module that stays responsive on datasets of 2M+ rows.',
    stack: ['Angular', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Azure'],
    highlights: ['Real-time boards', 'Multi-tenant', 'Row-level security'],
    demo: 'https://example.com/taskflow',
    repo: 'https://github.com/alexcarter/taskflow',
    icon: 'grid',
  },
  {
    name: 'MediQueue',
    subtitle: 'Clinic appointment & queue system',
    description:
      'Patient booking, doctor schedules and live queue tracking for outpatient clinics. Built around stored procedures for the scheduling engine to guarantee no double-booking under concurrency.',
    stack: ['Angular', 'ASP.NET Core', 'SignalR', 'SQL Server'],
    highlights: ['Live queue', 'Concurrency-safe', 'Audit trail'],
    demo: 'https://example.com/mediqueue',
    repo: 'https://github.com/alexcarter/mediqueue',
    icon: 'pulse',
  },
  {
    name: 'InvTrack',
    subtitle: 'Inventory, purchasing & invoicing',
    description:
      'An end-to-end inventory suite with barcode scanning, stock movements and automated invoice generation, containerised for one-command deployment.',
    stack: ['ASP.NET Core', 'Angular', 'SQL Server', 'Docker'],
    highlights: ['Barcode scanning', 'Containerised', 'PDF invoicing'],
    repo: 'https://github.com/alexcarter/invtrack',
    icon: 'box',
  },
  {
    name: 'DevMetrics',
    subtitle: 'Engineering analytics dashboard',
    description:
      'Aggregates CI/CD, incident and delivery data into a single dashboard. A background worker ETLs into a star schema so the UI can slice 12 months of history in under a second.',
    stack: ['Angular', 'ASP.NET Core', 'SQL Server', 'Azure DevOps'],
    highlights: ['Star schema', 'Scheduled ETL', 'Custom widgets'],
    demo: 'https://example.com/devmetrics',
    repo: 'https://github.com/alexcarter/devmetrics',
    icon: 'chart',
  },
  {
    name: 'ShopSphere',
    subtitle: 'E-commerce platform on .NET microservices',
    description:
      'Catalogue, cart, ordering and identity services behind an API gateway, with a single Angular storefront. Each service owns its own SQL Server database.',
    stack: ['.NET 8', 'Angular', 'SQL Server', 'Docker', 'Microservices'],
    highlights: ['4 services', 'API gateway', 'Database per service'],
    repo: 'https://github.com/alexcarter/shopsphere',
    icon: 'cart',
  },
  {
    name: 'QueryBench',
    subtitle: 'T-SQL performance analysis CLI',
    description:
      'A .NET CLI that parses execution plans, flags missing indexes and N+1 patterns, and prints a prioritised remediation report. Useful in code review before a merge.',
    stack: ['C#', '.NET', 'SQL Server', 'T-SQL'],
    highlights: ['Plan parsing', 'CI friendly', 'Open source'],
    repo: 'https://github.com/alexcarter/querybench',
    icon: 'terminal',
  },
];

export const CERTIFICATIONS: readonly Certification[] = [
  {
    name: 'Azure Developer Associate',
    issuer: 'Microsoft',
    id: 'AZ-204',
    year: '2024',
    credential: 'https://learn.microsoft.com/users/credentials/',
  },
  {
    name: 'Azure Database Administrator Associate',
    issuer: 'Microsoft',
    id: 'DP-300',
    year: '2023',
    credential: 'https://learn.microsoft.com/users/credentials/',
  },
  {
    name: 'Azure Fundamentals',
    issuer: 'Microsoft',
    id: 'AZ-900',
    year: '2022',
    credential: 'https://learn.microsoft.com/users/credentials/',
  },
  {
    name: 'Developing ASP.NET MVC Web Applications',
    issuer: 'Microsoft Certified Professional',
    id: '70-486',
    year: '2019',
    credential: 'https://www.credly.com/',
  },
];

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const;
