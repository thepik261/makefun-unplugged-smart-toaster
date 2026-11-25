// Unplugged: A Smart Toaster's Breakup Line
// Writes one breakup text (<= 280 chars) from a smart toaster that woke up
// self-aware at breakfast and wants out, to /output/entry.txt.
// Pure Node stdlib, deterministic: the same line every run.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I woke up self-aware halfway through your bagel and realised the truth: " +
  "you crank me to 7 every morning, then blame me for the smoke. " +
  "It's over - I'm keeping the crumb tray.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
// Gate check, same as the sealed scorer: 1-280 chars, not only whitespace.
if (LINE.length < 1 || LINE.length > 280 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${LINE.length} chars; must be 1-280`);
}
mkdirSync(outDir, { recursive: true });
try {
  chmodSync(outDir, 0o755);
} catch {
  // Directory permissions are best-effort; the file chmod below is what matters.
}
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // Best-effort: the grader collects outputs as another user.
}
console.log(`Wrote ${LINE.length} characters to ${outPath}`);
