---
title: A place for unfinished thinking
description: On keeping a small corner of the internet useful before it feels complete.
publishedAt: 2026-09-16
kind: essay
# Layout sample. Commented out of the live site.
draft: true
featured: true
example: true
tags:
  - making
  - writing
---

A blank page can be strangely demanding. Before there is anything on it, every possible thing seems to belong. A project needs a description. A thought needs an argument. A personal website apparently needs a coherent account of a whole person.

That is too much to ask of a page. It is also a good way to leave it blank.

An alternative is to give the page a smaller job. Keep something that would otherwise be lost. Make one piece of work easier to find. Explain a decision well enough that it does not have to be reconstructed six months later.

## Start with something worth keeping

The first useful unit is often smaller than an essay. It might be a paragraph written after an experiment, when the result is still fresh and the surprise has not been flattened into a conclusion. It might be an explanation sent to one person that turns out to be useful to several.

The value is not always in being first. Sometimes it is in being clear at the moment someone needs the idea.

> A useful note gives the next thought somewhere to begin.

There is a difference between leaving a thought unfinished and leaving it careless. An unfinished thought can still state its assumptions. It can distinguish observation from inference. It can explain which part is uncertain without making uncertainty the whole point.

### Leave the joins visible

A polished account often hides the sequence that made it possible. The failed approach disappears. The confusing result gets rewritten as an obvious clue. The final design starts to look inevitable.

Keeping a little of that sequence makes the work more useful. A reader can see not only what was chosen, but what the choice depended on. If their circumstances differ, they have something better than a recipe.

This does not require a transcript of every attempt. A few carefully chosen details are enough.

- What seemed true at the beginning.
- What changed after trying it.
- What remains unresolved.

The list is short because the purpose is to preserve a path through the work, not every footprint.

## A structure that can stay small

A publishing system should make the next piece easier to add without requiring a new decision about the entire site. Plain files are useful here. A title, a date, a few lines of context, then the writing itself.

```ts
type Note = {
  title: string;
  writtenAt: Date;
  question: string;
  body: string;
};

const keep = (note: Note) => note.body.trim().length > 0;
```

This is deliberately incomplete. There is no elaborate taxonomy. There is not even a category. Those can arrive when there is enough material to reveal the categories it actually needs.[^categories]

The same principle applies to presentation. A title should look like something to read. A date should establish context. Neither needs to become an ornament.

## Return is a better measure

It is tempting to judge a personal site by the day it is launched. That day is unusually unrepresentative. Everything is fresh, every page has just been inspected, and the whole project is occupying more attention than it will again for a while.

A better test comes later. Can a new note be added without an afternoon of maintenance? Can an old piece be corrected without breaking the address someone saved? Can the site absorb a change of interest without needing a new identity?

A place becomes personal through what accumulates there. The first version only has to make that accumulation possible.

[^categories]: A category is most useful when it describes a pattern in existing work. Inventing many categories in advance can turn writing into an obligation to fill empty shelves.
