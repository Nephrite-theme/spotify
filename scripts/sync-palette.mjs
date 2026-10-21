// Downloads the latest Nephrite palette into ./palette.json.
// Usage: node scripts/sync-palette.mjs   (Node 18+, no dependencies)
import { writeFile } from "node:fs/promises";

const SOURCE =
	"https://raw.githubusercontent.com/Nephrite-theme/palette/main/dist/palette.json";

const res = await fetch(SOURCE);
if (!res.ok) {
	console.error(`Could not download the palette (${res.status}) from ${SOURCE}`);
	process.exit(1);
}

const palette = await res.json();
await writeFile(
	new URL("../palette.json", import.meta.url),
	`${JSON.stringify(palette, null, 2)}\n`,
);
console.log(`palette.json updated to Nephrite palette v${palette.version}.`);
