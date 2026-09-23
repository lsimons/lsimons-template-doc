// Render a Quarto slide deck to HTML + PDF, then turn off the reveal.js
// postMessage API in the HTML.
//
// reveal.js (which Quarto embeds) listens for `message` events from any
// origin by default (`postMessage: true`) and calls the named API method,
// including `initialize`, whose `dependencies` option loads a script from a
// URL. So any page that iframes or opens the published deck could run its
// own script on the site origin. Quarto has no front-matter switch for this
// option (it is not one of the ones its template emits), so this script
// adds `postMessage: false` to the generated `Reveal.initialize({...})`
// call after rendering. The speaker-notes view keeps working: it has its
// own listener and does not use this API.
//
// Usage: bun scripts/render-slides.mjs <deck.qmd> [--html-only]
// (see `mise run site-slides`). `--html-only` skips the Beamer PDF, for a
// machine where LaTeX is missing or hangs; the committed PDF then stays as
// it was, which is only right if the .qmd did not change.

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const [deck, ...rest] = process.argv.slice(2);
const htmlOnly = rest.includes("--html-only");
const unknown = rest.filter((arg) => arg !== "--html-only");
if (!deck || !deck.endsWith(".qmd") || unknown.length > 0) {
	console.error("usage: bun scripts/render-slides.mjs <deck.qmd> [--html-only]");
	process.exit(2);
}

// argv array, no shell: the deck path is passed through as one argument.
const quartoArgs = ["render", deck];
if (htmlOnly) {
	quartoArgs.push("--to", "revealjs");
}
const render = spawnSync("quarto", quartoArgs, { stdio: "inherit" });
if (render.error) {
	console.error(`quarto render failed to start: ${render.error.message}`);
	process.exit(1);
}
if (render.status !== 0) {
	process.exit(render.status ?? 1);
}

const html = deck.replace(/\.qmd$/, ".html");
const source = readFileSync(html, "utf8");
const marker = "Reveal.initialize({";
const occurrences = source.split(marker).length - 1;
if (occurrences !== 1) {
	console.error(`${html}: expected exactly one "${marker}", found ${occurrences}`);
	process.exit(1);
}
const patched = source.replace(
	marker,
	`${marker}\n` +
		"        // Added by scripts/render-slides.mjs (not Quarto): the cross-window\n" +
		"        // postMessage API checks no origin, so it stays off.\n" +
		"        postMessage: false,",
);
writeFileSync(html, patched);
console.log(`${html}: reveal.js postMessage API disabled`);
