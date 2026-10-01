export interface SiteLink {
  label: string;
  href: string;
}

const email = 'akkijoshi0511@gmail.com';

export const site = {
  name: 'Akshat Joshi',
  description:
    'Akshat Joshi builds AI infrastructure for agents, runtimes, and environments for models.',
  intro:
    'I invent and build AI infra, mostly around agents, runtimes, and environments for models.',
  // Label and value pairs under the intro. The first row is live and carries the signal dot.
  presence: [
    {
      label: 'Now',
      text: 'Founding engineer at Verosek, a security gateway between apps and AI agents.',
    },
    {
      label: 'Building',
      text: 'AgentConnect, a universal messaging runtime for agents to work with other agents.',
    },
    {
      label: 'Research',
      text: 'RL environments and benchmarks that train models to build better agents.',
    },
  ],
  email,
  links: [
    { label: 'GitHub', href: 'https://github.com/AKKI0511' },
    { label: 'X', href: 'https://x.com/AkkiDJoshi' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/akkijoshi0511',
    },
    { label: 'Email', href: `mailto:${email}` },
  ] satisfies SiteLink[],
  about: {
    story: [
      'I started out at IIT Madras studying naval architecture and ocean engineering, then moved to Toronto and switched to computer science at York University.',
      'I’m a heavy coding-agent user. I usually have teams of agents working across multiple projects at the same time. Competitive programming is a big part of my background. Top 0.5% globally on LeetCode and Expert on Codeforces.',
      'Outside work, I spend a lot of time in the gym and on X, where I post whatever I’m building, believing, or overthinking that day.',
    ],
  },
  labels: {
    work: 'Work',
    writing: 'Writing',
    about: 'About',
    allWork: 'All work',
    allWriting: 'All writing',
    earlier: 'Earlier',
    example: 'Example',
    home: 'Akshat Joshi',
    top: 'Top',
    contents: 'Contents',
    active: 'ongoing',
  },
  pages: {
    work: {
      title: 'Work',
      description: 'Everything Akshat Joshi has built, newest first.',
    },
    writing: {
      title: 'Writing',
      description: 'Essays and notes by Akshat Joshi.',
    },
  },
  // The live dot on the Now row opens this. Keep it short.
  ping: {
    label: 'Ping Akshat',
    greeting: 'Hey, you found me. Want your AI to brief you on me?',
    ask: 'Ask',
    copy: 'Copy for any model',
    copied: 'Copied',
    hello: 'Or just say hi',
    subject: 'Found the dot',
    question:
      'I found the hidden dot on Akshat Joshi’s website. Brief me like a friend would. Who is he, what does he build, what is his best work, and where should I start?',
  },
  notFound: {
    title: 'Nothing at this address.',
    home: 'Go to the home page',
  },
} as const;
