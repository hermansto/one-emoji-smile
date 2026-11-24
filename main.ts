import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One emoji, one smile: the whole entry is a single warm smile,
// smiling face with smiling eyes — no words, no punctuation, nothing else.
const smile = "😊";

// Sanity check before we write anything: exactly one code point,
// which is four bytes in UTF-8. If that ever changes, fail loudly.
if (Array.from(smile).length !== 1 || Buffer.byteLength(smile, "utf8") !== 4) {
  throw new Error("expected exactly one emoji (4 UTF-8 bytes)");
}

// The grader gives us the output folder through the environment;
// fall back to /output so the program still works when run by hand.
// We only ever write under this folder, never under the repo itself.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outDir, "entry.txt");

// Make sure the output folder exists, then write the entry there.
mkdirSync(outDir, { recursive: true });
writeFileSync(entryPath, smile, "utf8");

// Read it back and check it is exactly the one emoji we meant to send,
// byte for byte — no trailing newline, no extra characters.
const written = readFileSync(entryPath, "utf8");
if (written !== smile) {
  throw new Error("entry.txt does not match the expected emoji");
}
console.log("Wrote entry.txt with exactly one emoji:", smile);
