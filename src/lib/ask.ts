const assistants = [
  { label: 'Grok', base: 'https://grok.com/?q=' },
  { label: 'ChatGPT', base: 'https://chatgpt.com/?q=' },
  { label: 'Claude', base: 'https://claude.ai/new?q=' },
] as const;

/** Assistant links sit safely under common URL limits below this length. */
const INLINE_LIMIT = 7000;

/**
 * Links that open an assistant with the question already asked. The site
 * index travels inside the link while it fits; after that the assistant is
 * pointed at the index URL, which needs a public origin to be fetched.
 */
export function assistantLinks(
  question: string,
  index: string,
  indexUrl: string,
) {
  const inline = `${question}\n\n${index}`;
  const prompt =
    encodeURIComponent(inline).length <= INLINE_LIMIT
      ? inline
      : `${question} Start with ${indexUrl}`;
  return assistants.map(({ label, base }) => ({
    label,
    href: base + encodeURIComponent(prompt),
  }));
}
