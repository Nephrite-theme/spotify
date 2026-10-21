// Generates the Spicetify color schemes for every flavor from palette.json.
// Usage: node scripts/sync-palette.mjs && node scripts/build.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const palette = JSON.parse(readFileSync(new URL("palette.json", root)));

// Spicetify's color keys mapped to palette roles (see the palette's porting
// guide). Spicetify turns each key into --spice-<key> for Spotify's UI.
const ROLES = {
	text: "text",
	subtext: "subtext",
	// Surfaces, from the main view down to the frame around it
	main: "base",
	"main-elevated": "surface0",
	highlight: "surface0",
	"highlight-elevated": "surface1",
	sidebar: "mantle",
	player: "mantle",
	card: "surface0",
	shadow: "crust",
	"tab-active": "surface1",
	// Selected and hovered rows are tinted with this color at low opacity
	"selected-row": "text",
	// Play and like buttons, progress bars, links
	button: "jade",
	"button-active": "mint",
	"button-disabled": "overlay0",
	notification: "sapphire",
	"notification-error": "garnet",
	misc: "overlay1",
};

// One [Section] per flavor; Spicetify drops the "#".
const sections = Object.values(palette.flavors).map((flavor) => {
	const width = Math.max(...Object.keys(ROLES).map((k) => k.length));
	const lines = Object.entries(ROLES).map(
		([key, role]) => `${key.padEnd(width)} = ${flavor.colors[role].slice(1)}`,
	);
	return `[${flavor.name}]\n${lines.join("\n")}`;
});

mkdirSync(new URL("Nephrite/", root), { recursive: true });
writeFileSync(
	new URL("Nephrite/color.ini", root),
	`; Nephrite for Spotify, generated from the Nephrite palette v${palette.version}.
; Don't edit by hand: change scripts/build.mjs and run it again.
; Pick a flavor with: spicetify config color_scheme <Forest|Jade|Mint>

${sections.join("\n\n")}
`,
);
console.log(`color.ini: ${sections.length} schemes (${Object.values(palette.flavors).map((f) => f.name).join(", ")})`);

// README swatches: only the palette colors this port actually uses, in
// palette order, so the preview never promises colors the theme skips.
const used = new Set(Object.values(ROLES));
const usedKeys = [...palette.neutrals, ...palette.accents].filter((k) => used.has(k));
mkdirSync(new URL("assets/", root), { recursive: true });
for (const [key, flavor] of Object.entries(palette.flavors)) {
	const c = flavor.colors;
	const size = 44;
	const gap = 10;
	const pad = 14;
	const w = pad * 2 + usedKeys.length * size + (usedKeys.length - 1) * gap;
	const h = pad * 2 + size + 22;
	const cells = usedKeys
		.map((k, i) => {
			const x = pad + i * (size + gap);
			return `<rect x="${x}" y="${pad}" width="${size}" height="${size}" rx="10" fill="${c[k]}" stroke="${c.surface1}" stroke-width="1"/><text x="${x + size / 2}" y="${pad + size + 16}" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9" fill="${c.subtext}">${k}</text>`;
		})
		.join("");
	writeFileSync(
		new URL(`assets/${key}.svg`, root),
		`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" rx="14" fill="${c.base}"/>${cells}</svg>\n`,
	);
}
console.log(`swatches: ${usedKeys.length} colors (${usedKeys.join(", ")})`);
