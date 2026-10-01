export interface SiteLink {
  label: string;
  href: string;
}

const email = 'akkijoshi0511@gmail.com';

export const site = {
  name: 'Akshat Joshi',
  description:
    'Akshat Joshi builds infrastructure for AI agents, including runtimes, multi-agent systems, and training environments.',
  intro:
    'I build infrastructure for AI agents, from runtimes to training environments.',
  // Label and value pairs under the intro. The first row is live and carries the signal dot.
  presence: [
    {
      label: 'Now',
      text: 'Founding engineer at Verosek, building security infrastructure for AI agents.',
    },
    {
      label: 'Building',
      text: 'AgentConnect, a runtime for agents to form teams across frameworks and machines.',
    },
    {
      label: 'Research',
      text: 'RL environments and benchmarks for training models to build better agents.',
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
      'I usually have a few coding agents working across different projects at once. Competitive programming has also been a big part of my background. Top 0.5% globally on LeetCode and Expert on Codeforces.',
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
