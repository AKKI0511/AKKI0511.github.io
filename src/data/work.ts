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
  /** Conversational paragraphs. Each string is its own block in the open row. */
  story: string[];
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
    tags: ['Agents', 'Distributed systems', 'Infrastructure'],
    start: 2025,
    end: 'now',
    summary:
      'A runtime for any agents to form teams and work with other teams, locally or remotely.',
    story: [
      'Agents are getting good on their own, but getting independently built agents to work together is still messy. Different frameworks have their own tools, memory, and ways of communicating.',
      'AgentConnect gives them a common runtime instead. An agent keeps whatever model, tools, or harness it already uses, but can still discover other agents, send them work, keep conversations going, and wait for results.',
      'Agents can run in the same process or across machines over HTTP. They can also connect through MCP, and even an entire multi-agent system can show up as one agent and work with another team.',
    ],
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
    tags: ['AI environments', '3D simulation', 'Real-time AI'],
    start: 2026,
    summary:
      'A 3D world that understands your intent and adapts around you.',
    story: [
      'Most AI interfaces start with you telling a machine exactly what you want. I wanted to try the opposite.',
      'In Living Matter, you just move through the world. TypeSafe’s Jev System One model acts as its brain, watching your movement and deciding how a body of 512 pieces should reorganize into steps, bridges, and platforms around you.',
      'The model still has to act within the world’s physical rules, so it cannot just generate anything it wants.',
      'It is basically an experiment in machines learning how to help by watching us instead of waiting for a prompt.',
    ],
    links: [
      { label: 'Play', href: 'https://livingmatter.vercel.app' },
      { label: 'Repository', href: repo('living-matter') },
    ],
  },
  {
    id: 'quanttradeai',
    title: 'QuantTradeAI',
    tags: ['Coding agents', 'Quant finance', 'Research'],
    start: 2025,
    end: 2026,
    summary: 'A quant research lab where coding agents run, compare, and improve trading experiments.',
    story: [
      'Coding agents can write a backtest pretty easily. The annoying part is everything after that.',
      'Each experiment usually ends up with different scripts, folders, metrics, and outputs, so comparing runs gets messy and the next session starts from scratch.',
      'QuantTradeAI gives coding agents like Claude Code, Codex, or Cursor one structured research environment. A YAML project file and CLI drive backtests, parameter sweeps, comparisons, and machine-readable artifacts that the next experiment can build on.',
      'Strategies move from backtest to paper to live through explicit gates, so agents can experiment without getting control of real money by default.',
    ],
    links: [
      { label: 'Docs', href: 'https://akkijoshi.gitbook.io/quanttradeai' },
      { label: 'Repository', href: repo('QuantTradeAI') },
    ],
  },
  {
    id: 'soundsight',
    title: 'SoundSight',
    tags: ['Accessibility', 'Audio AI', 'Edge AI'],
    start: 2026,
    summary:
      'On-device AI that turns important sounds into visual alerts for people who cannot hear them.',
    story: [
      'A lot of everyday information only exists as sound. A smoke alarm, doorbell, someone calling your name, or something breaking nearby can be easy to miss if you are Deaf or hard of hearing.',
      'SoundSight listens for those sounds and turns them into visual alerts as they happen.',
      'It runs Gemma 4 locally on the device through Cactus, so the audio does not need to be continuously sent to a cloud model. That keeps the system responsive while something as personal as the sounds around you stays on your own machine.',
    ],
    links: [{ label: 'Repository', href: repo('SoundSight') }],
  },
  {
    id: 'smallbizpal',
    title: 'SmallBizPal',
    tags: ['AI agents', 'Automation', 'Small business'],
    start: 2025,
    summary:
      'A team of AI agents that helps run the repetitive parts of a small business.',
    story: [
      'Small business owners end up doing everything themselves. Marketing, customer questions, reporting, and keeping basic business information up to date all compete for the same person’s time.',
      'SmallBizPal splits that work across a team of agents built with Google’s Agent Development Kit. One learns about the business from the owner, others handle things like content and reports, and a public-facing agent can answer customer questions.',
      'The agents can use external tools through MCP, while the public agent only gets a sanitized view of the business instead of access to everything the owner has shared.',
    ],
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
