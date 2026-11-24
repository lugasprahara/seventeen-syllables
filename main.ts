// Seventeen Syllables of Debugging — one haiku about debugging.
//
// The whole entry is a single haiku in the 5-7-5 shape: seventeen
// syllables, three lines, at most 200 characters. The program writes it
// to /output/entry.txt, where the grader's gate checks it (UTF-8, 1–200
// characters) and the judge compares it against the other entries.
//
// The poem: at three in the morning the cursor is still blinking and the
// logs have said everything they are going to say. The final log line
// gets the last word, and the last word is the crash itself — after a
// segfault there is nothing left to read. The turn is the silence: the
// trail the debugger was following ends mid-sentence, because the
// program died writing it.
//
// Syllable count, word by word:
//   Cursor(2) blinks(1) at(1) three(1)              = 5
//   the(1) final(2) log(1) line(1) just(1) says(1)  = 7
//   segfault(2) then(1) silence(2)                  = 5
//   total                                           = 17

import { mkdirSync, writeFileSync } from "node:fs";

// Each line carries its own word-by-word syllable count, so the form
// check below adds the poem up from its words instead of trusting a
// hand-written total per line.
type HaikuLine = { text: string; parts: [word: string, syllables: number][] };

const LINES: HaikuLine[] = [
  {
    text: "Cursor blinks at three",
    parts: [["Cursor", 2], ["blinks", 1], ["at", 1], ["three", 1]],
  },
  {
    text: "the final log line just says",
    parts: [["the", 1], ["final", 2], ["log", 1], ["line", 1], ["just", 1], ["says", 1]],
  },
  {
    text: "segfault — then silence",
    parts: [["segfault", 2], ["then", 1], ["silence", 2]],
  },
];

const syllablesOf = (line: HaikuLine): number =>
  line.parts.reduce((sum, [, count]) => sum + count, 0);

const HAIKU = LINES.map((line) => line.text).join("\n");

// The form is the whole game: refuse to ship anything that is not a
// 5-7-5 haiku of exactly seventeen syllables inside the gate's limits.
// Each failure names the exact line or limit that broke, so a bad edit
// is debuggable from the error alone.
function assertHaikuForm(lines: HaikuLine[], haiku: string): void {
  const shape = lines.map(syllablesOf);
  const total = shape.reduce((a, b) => a + b, 0);
  if (shape.join("-") !== "5-7-5") {
    throw new Error(
      `haiku lines must scan 5-7-5, got ${shape.join("-")} (${total} syllables total)`,
    );
  }
  if (total !== 17) {
    throw new Error(`haiku must total exactly 17 syllables, got ${total}`);
  }
  if (haiku.length < 1 || haiku.length > 200) {
    throw new Error(`haiku must be 1-200 characters, got ${haiku.length}`);
  }
}

assertHaikuForm(LINES, HAIKU);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", HAIKU, "utf8");
