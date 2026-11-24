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

const LINES: { text: string; syllables: number }[] = [
  { text: "Cursor blinks at three", syllables: 5 },
  { text: "the final log line just says", syllables: 7 },
  { text: "segfault — then silence", syllables: 5 },
];

const HAIKU = LINES.map((line) => line.text).join("\n");

// The form is the whole game: refuse to ship anything that is not a
// 5-7-5 haiku of exactly seventeen syllables inside the gate's limits.
const shape = LINES.map((line) => line.syllables);
if (shape.join("-") !== "5-7-5" || shape.reduce((a, b) => a + b, 0) !== 17) {
  throw new Error(`haiku must be 5-7-5 (17 syllables), got ${shape.join("-")}`);
}
if (HAIKU.length < 1 || HAIKU.length > 200) {
  throw new Error(`haiku must be 1-200 characters, got ${HAIKU.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", HAIKU, "utf8");
