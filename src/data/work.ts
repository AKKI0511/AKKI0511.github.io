import type { SiteLink } from './site';

export interface WorkItem {
  id: string;
  title: string;
  /** Where the project sits, for someone who has never heard of it. */
  tags: string[];
  start: number;
  /** Omit for one-year work. Use 'now' while the project is maintained. */
  end?: number | 'now';
  /** One line. The first thing shown when the row opens. */
  summary: string;
  /** Conversational. The problem, why it matters, what this does about it, and what came of it. */
  story: string;
  links: SiteLink[];
}

export interface EarlierItem {
  title: string;
  year: number;
  summary: string;
  href: string;
}

const repo = (name: string) => `https://github.com/AKKI0511/${name}`;

export const work: WorkItem[] = [
  {
    id: 'agentconnect',
    title: 'AgentConnect',
    tags: ['Multi-agent systems', 'Runtime', 'Open source'],
    start: 2025,
    end: 'now',
    summary:
      'A messaging runtime so independently built agents can work as one team.',
    story:
      'Most agents only talk easily to others built the same way. AgentConnect lets them join as peers, keep their own models, tools, and memory, and still find teammates, send work, and wait for answers. The runtime keeps the directory, delivers messages, tracks outstanding work, and holds shared conversation history. It won a Coinbase Builder Grant as one of four projects worldwide.',
    links: [
      { label: 'Repository', href: repo('AgentConnect') },
      { label: 'Docs', href: 'https://akki0511.github.io/AgentConnect/' },
      {
        label: 'Publication',
        href: 'https://app.readytensor.ai/publications/agentconnect-decentralized-collaboration-framework-for-independent-ai-agents-RLFuglEDiwwS',
      },
    ],
  },
  {
    id: 'living-matter',
    title: 'Living Matter',
    tags: ['Browser game', '3D', 'Interactive art'],
    start: 2026,
    summary:
      'A 3D world where living matter builds a path around how you move.',
    story:
      'Most 3D pages are either a game with a fixed course or a scene you only look at. Living Matter is a flooded observatory. You walk the limestone, turn toward open water, and one body of 512 pieces gathers into steps, bridges, and platforms, recycling as you go without pulling occupied support. Preview needs no key. Live mode asks Jev to pick the next legal move.',
    links: [
      { label: 'Play', href: 'https://livingmatter.vercel.app' },
      { label: 'Repository', href: repo('living-matter') },
    ],
  },
  {
    id: 'quanttradeai',
    title: 'QuantTradeAI',
    tags: ['Coding agents', 'Quant finance', 'Backtesting'],
    start: 2025,
    end: 2026,
    summary: 'A quant research lab built for coding agents.',
    story:
      'Ask a coding agent to research a trading strategy and it tends to write a fresh pile of scripts. Results scatter, runs are hard to compare, and the next session starts from zero. QuantTradeAI gives the agent one project file and a CLI for the whole loop, with the same artifacts every run, so it can rank what worked. Nothing trades live until a human signs off.',
    links: [
      { label: 'Docs', href: 'https://akkijoshi.gitbook.io/quanttradeai' },
      { label: 'Repository', href: repo('QuantTradeAI') },
    ],
  },
  {
    id: 'soundsight',
    title: 'SoundSight',
    tags: ['Accessibility', 'On-device AI', 'Audio'],
    start: 2026,
    summary:
      'Local AI that turns important sounds into visual alerts for Deaf and hard-of-hearing people.',
    story:
      'If you’re Deaf or hard of hearing, a smoke alarm, a doorbell, or someone calling your name can go by without you ever knowing. Streaming that audio to a cloud service is slow and hard to trust. SoundSight runs Gemma 4 locally through Cactus, listens for the sounds that matter, and turns them into visual alerts as they happen. The audio stays on your machine, and a demo mode with recorded clips lets anyone try it without a microphone.',
    links: [{ label: 'Repository', href: repo('SoundSight') }],
  },
  {
    id: 'smallbizpal',
    title: 'SmallBizPal',
    tags: ['AI agents', 'Small business', 'Google ADK'],
    start: 2025,
    summary:
      'A team of AI agents that handles marketing, customer questions, and reporting for a small business.',
    story:
      'A small business owner is usually the marketing team, the support desk, and the analyst at once. An AI chat widget could help, but wiring one up normally means handing it private data and hoping none of it reaches a customer. SmallBizPal splits the job across agents. One learns the business by asking the owner questions, others write marketing and reports, and a public agent talks to visitors. That public agent only ever sees a sanitized slice of the business.',
    links: [
      { label: 'Live demo', href: 'https://smallbizpal.vercel.app/' },
      { label: 'Video', href: 'https://youtu.be/thGJiX9AYbk' },
      { label: 'Repository', href: repo('smallbizpal') },
    ],
  },
];

/** Older, smaller projects. Listed on /work/ and in the exported file. */
export const earlier: EarlierItem[] = [
  {
    title: 'AI Code Generator',
    year: 2024,
    summary:
      'One workspace for generating, reviewing, documenting, testing, and scanning code against your repo.',
    href: repo('AI-Code-Generator'),
  },
  {
    title: 'Masked language model explorer',
    year: 2024,
    summary:
      'Attention maps, token prediction, and SHAP for BERT-style models.',
    href: repo('Masked-Language-Model'),
  },
  {
    title: 'Traffic sign recognition',
    year: 2024,
    summary:
      'A custom CNN against ResNet50 and MobileNetV2 transfer learning, reaching 98.8% accuracy.',
    href: repo('Traffic-Sign-Recognition'),
  },
  {
    title: 'ChatPDF',
    year: 2024,
    summary: 'Generate and edit PDFs through conversation.',
    href: repo('ChatPDF'),
  },
  {
    title: 'Nim AI',
    year: 2024,
    summary: 'A Nim opponent trained with Q-learning self-play.',
    href: repo('Nim-Game-AI'),
  },
  {
    title: 'Snake 2.0',
    year: 2023,
    summary:
      'Snake in Lua and LÖVE, with a rage mode and autonomous enemy snakes.',
    href: repo('Snake_2.O_GAME'),
  },
];

export const isActive = (item: WorkItem) => item.end === 'now';

/** 2025– while active, 2025–26 for a range, 2025 for a single year. */
export function workYears(item: WorkItem): string {
  if (item.end === 'now') return `${item.start}–`;
  if (item.end && item.end !== item.start)
    return `${item.start}–${String(item.end).slice(2)}`;
  return String(item.start);
}
