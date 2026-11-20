/** The portfolio. Featured projects get their own page at
 * `/projects/<slug>`; earlier ones link straight out. Order is the order
 * shown. */

export type Project = {
  slug: string
  name: string
  /** One line, for lists and the meta description. */
  summary: string
  /** A sentence or two more, for cards. */
  description: string
  kind: string
  year: string
  url: string
  image: { src: string; alt: string }
  stack: ReadonlyArray<string>
  /** Paragraphs for the project page. */
  overview: ReadonlyArray<string>
  highlights: ReadonlyArray<string>
  role: string
  platform: string
}

export const projects: ReadonlyArray<Project> = [
  {
    slug: 'bliss',
    name: 'Bliss',
    summary:
      'A wedding website maker for couples in the Philippines, with RSVPs built in.',
    description:
      'Templates, a section-by-section editor and RSVPs, with the guest list, budget, suppliers and timeline in the same place.',
    kind: 'SaaS',
    year: '2026',
    url: 'https://bliss-ph.com',
    image: {
      src: '/projects/bliss.png',
      alt: 'Bliss: a wedding website for Kim and Jeff shown on a phone, with an RSVP confirmation',
    },
    stack: [
      'TanStack Start',
      'TypeScript',
      'Postgres',
      'Drizzle',
      'Better Auth',
      'Cloudflare Workers',
    ],
    overview: [
      'Bliss lets a couple pick a template and a palette, enter their wedding details once, and write their site section by section with a live desktop and phone preview. Building and planning are free; a couple pays once per site when they publish.',
      'Once the site is live, guests find their name on the RSVP page and reply for their whole party. Replies land in one list with party sizes and messages, ready to export as CSV.',
    ],
    highlights: [
      'Templates and palettes that can be switched later without losing a word.',
      'Wedding details entered once and reused by the hero, countdown, venue and RSVP sections.',
      'A section editor with live preview, hidden sections and draft saving before publishing.',
      'RSVPs by party, plus a planner for the guest list, budget, suppliers and timeline.',
    ],
    role: 'Design & engineering',
    platform: 'Web',
  },
  {
    slug: 'osamu',
    name: 'Osamu',
    summary:
      'Payday budgeting that covers your bills first, then shows what is safe to spend.',
    description:
      'Bills, credit cards and loans are covered first; then you see the one number that is really yours until payday.',
    kind: 'Personal finance',
    year: '2026',
    url: 'https://osamu.jeffsegovia.dev',
    image: {
      src: '/projects/osamu.png',
      alt: 'Osamu home screen showing the amount that is safe to spend until payday',
    },
    stack: [
      'TanStack Start',
      'TypeScript',
      'Postgres',
      'Drizzle',
      'Better Auth',
      'Cloudflare Workers',
    ],
    overview: [
      'Osamu is a personal budgeting app that helps people spot a cash shortfall before it happens. It connects account balances, bills, essentials, savings funds and debt payments to answer two questions: how much can I safely spend until payday, and if I buy this, will I still have enough for what is due?',
      'It is built for how people in the Philippines get paid and pay: GCash, Maya and banks, with no bank login required.',
    ],
    highlights: [
      'A single Safe to spend figure that accounts for everything due before payday.',
      'Purchase checks that preview how a purchase affects the rest of the pay cycle.',
      'Set-asides for card spending and budgets, and weekend-aware payday schedules.',
      'Receipt scanning in the browser with Tesseract OCR.',
    ],
    role: 'Design & engineering',
    platform: 'Web · PWA',
  },
  {
    slug: 'reviu',
    name: 'Reviu',
    summary:
      'Board exam review for PRC licensure exams: practice, mock exams and worked solutions.',
    description:
      'Practice by topic, timed mocks that follow the official table of specifications, a study plan, and a worked solution for every item.',
    kind: 'EdTech',
    year: '2026',
    url: 'https://reviu.studio',
    image: {
      src: '/projects/reviu.png',
      alt: 'Reviu dashboard and study plan on a laptop and a phone',
    },
    stack: [
      'TanStack Start',
      'TypeScript',
      'Postgres',
      'Drizzle',
      'Better Auth',
      'KaTeX',
      'Cloudflare Workers',
    ],
    overview: [
      'Reviu is a review platform for Philippine licensure exams. Reviewees practice by topic, take mock board exams that follow the official Table of Specifications, and read step-by-step solutions. Instructors can run classes and build exams from chosen subjects.',
      'It is multi-program by design: Electronics Engineering is the first program, and each program is data — its exam rules and TOS — rather than code.',
    ],
    highlights: [
      'Mock exams generated from the official Table of Specifications.',
      'Calculation items from code generators, each with a worked solution typeset in KaTeX.',
      'A study plan with accuracy by week, study days and the topics that need work.',
      'A formula library, and a free tier with prepaid passes for more.',
    ],
    role: 'Design & engineering',
    platform: 'Web · PWA',
  },
  {
    slug: 'worsheep',
    name: 'Worsheep',
    summary:
      'Chord charts and set lists for worship teams: one song library, any key, every phone.',
    description:
      'A shared song library with a ChordPro editor, transposition, capo and Nashville views, set lists and Live mode.',
    kind: 'Team tool',
    year: '2026',
    url: 'https://worsheep.studio',
    image: {
      src: '/projects/worsheep.png',
      alt: 'Worsheep chord chart for a worship song',
    },
    stack: [
      'TanStack Start',
      'TypeScript',
      'CodeMirror',
      'Postgres',
      'Drizzle',
      'Better Auth',
      'Cloudflare Workers',
    ],
    overview: [
      'Worsheep gives a worship team one song library. Charts are written in ChordPro in a CodeMirror editor with chord suggestions in the song’s key, and pasted chords-over-lyrics are converted automatically.',
      'Each player gets the view they need — chords in any key, capo shapes, Nashville numbers or lyrics only — and in Live mode every phone follows the leader through the set.',
    ],
    highlights: [
      'A ChordPro editor with highlighting, in-key chord suggestions and section snippets.',
      'Transpose to any key with undo; capo, Nashville-number and lyrics-only views.',
      'Versions of a chart per singer and key, and read-only share links.',
      'Set lists, rehearsal and Live mode, with YouTube and Spotify beside the chart.',
    ],
    role: 'Design & engineering',
    platform: 'Web · PWA',
  },
  {
    slug: 'abide-in-the-vine',
    name: 'Abide in the Vine',
    summary:
      'A Christian blog: God-exalting, Christ-centered writing on finding joy in Christ.',
    description:
      'My faith blog and ministry site — long-form posts, a featured-post carousel, tags, search and a dark mode.',
    kind: 'Publication',
    year: 'Ongoing',
    url: 'https://abideinthevineph.org',
    image: {
      src: '/projects/abide-in-the-vine.png',
      alt: 'Abide in the Vine home page with a featured post, “The First Display of the Gospel”',
    },
    stack: ['Next.js', 'React', 'TypeScript'],
    overview: [
      'Abide in the Vine is where I write about the Christian faith. Its aim is to glorify God by proclaiming that satisfaction and joy are found only in Jesus Christ — “having Christ as joy and finding joy in Christ.”',
      'I designed and built the site myself: a reading-first blog with a featured-post carousel, reading times, tags, search, share links and a dark mode, alongside pages on the Gospel and the ministry.',
    ],
    highlights: [
      'Long-form posts with reading times, tags and share links.',
      'A featured-post carousel and search across every post.',
      'Light and dark themes, built to be comfortable to read at length.',
      'Pages on the Gospel and the ministry, with a companion Facebook page.',
    ],
    role: 'Writing, design & engineering',
    platform: 'Web',
  },
  {
    slug: 'gatelab',
    name: 'GateLab',
    summary:
      'Learn digital logic and basic electronics by wiring them on a live board.',
    description:
      '16 digital logic lessons and 25 electronics labs, each with a board or schematic that checks your work as you build.',
    kind: 'Learning platform',
    year: '2026',
    url: 'https://gatelab.jeffsegovia.dev',
    image: {
      src: '/projects/gatelab.png',
      alt: 'GateLab: an AND gate wired to two inputs, and a transistor driving an LED',
    },
    stack: [
      'React',
      'TypeScript',
      'TanStack Router',
      'React Flow',
      'Zustand',
      'MDX',
      'Tailwind CSS',
    ],
    overview: [
      'GateLab teaches digital logic on a live breadboard. Each lesson explains one idea, gives you a board with the inputs and lamps already placed, and checks your circuit against a goal truth table or, for memory circuits, a clock sequence. It goes from a single NOT gate to adders, latches, flip-flops and a 2-bit counter.',
      'A second module, Basic Electronics, does the same for analog circuits: each lesson pairs its text with a lab — a live schematic with sliders for the part values, readouts and plots — and a task that is checked as you move the sliders.',
    ],
    highlights: [
      '16 digital logic lessons across Basics, Combinational and Sequential logic.',
      'A board built on React Flow: drag to wire, undo and redo, zoom, auto-tidy by signal flow, and a clock you can run or step.',
      'Truth-table grading with gate limits, and sequence replay for latches, flip-flops and counters.',
      '25 electronics labs from Ohm’s law to the common-emitter amplifier, with live plots.',
    ],
    role: 'Design & engineering',
    platform: 'Web · PWA',
  },
]

export type EarlierProject = {
  name: string
  summary: string
  stack: string
  url: string
}

/** Earlier work and practice projects, from the previous site. */
export const earlierProjects: ReadonlyArray<EarlierProject> = [
  {
    name: 'Edumetrics',
    summary:
      'A school management and grading system that tracks and visualises students’ grades and rankings.',
    stack: 'Next.js',
    url: 'https://edumetrics-dev.vercel.app',
  },
  {
    name: 'Movuex',
    summary: 'A movie discovery site, built to explore MUI with Next.js.',
    stack: 'Next.js · MUI',
    url: 'https://segovia-movuex-app.vercel.app/',
  },
  {
    name: 'Calculator',
    summary:
      'A technical-interview project that is a good tour of React hooks and the Context API.',
    stack: 'React',
    url: 'https://segovia-react-calculator.vercel.app/',
  },
  {
    name: 'Guava Electronics',
    summary: 'A static website for my online electronics store.',
    stack: 'HTML · Sass',
    url: 'https://guavaelecs.netlify.app/',
  },
  {
    name: 'CRUD App',
    summary: 'A CRUD application that makes real API calls to a mock server.',
    stack: 'React · Bootstrap',
    url: 'https://segovia-crud-app.netlify.app/',
  },
  {
    name: 'URL Shortener',
    summary: 'A Frontend Mentor challenge, built to review Vue.',
    stack: 'Vue',
    url: 'https://jeff-url-shortener.netlify.app/',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
