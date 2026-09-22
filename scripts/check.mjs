import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = path => JSON.parse(readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const p = read('src/palette.json'), t = read('themes/vesperveil-dark.json'), wt = read('ports/windows-terminal/vesperveil.json');
const luminance = hex => {
  const v = hex.slice(1).match(/../g).map(x => parseInt(x,16)/255).map(x => x <= .04045 ? x/12.92 : ((x+.055)/1.055)**2.4);
  return v[0]*.2126 + v[1]*.7152 + v[2]*.0722;
};
const contrast = (a,b) => {const x=luminance(a), y=luminance(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
for (const [key, color] of Object.entries(t.colors)) assert.match(color, /^#[0-9a-f]{6}([0-9a-f]{2})?$/i, key);
for (const key of ['foreground','muted','keyword','function','type','string','number','info','error','warning','success']) {
  const ratio=contrast(p[key],p.background); assert.ok(ratio >= 4.5, `${key}: ${ratio}`); console.log(`${key}: ${ratio.toFixed(2)}:1`);
}
assert.ok(contrast(p.foreground,p.selection)>=4.5);
assert.ok(contrast(p.foreground,p.surface)>=4.5);
for (const [key, color] of Object.entries(p.ansi)) assert.equal(wt[key],color);
assert.equal(wt.background,t.colors['terminal.background']);
for (const r of t.tokenColors) if (r.settings.fontStyle.includes('italic')) assert.equal(r.name,'Comments');
for (const [key, style] of Object.entries(t.semanticTokenColors)) if(style.italic) assert.equal(key,'comment');
assert.equal(Object.keys(p.ansi).length,16);
console.log('Color syntax, text contrast, italic policy and terminal parity passed.');
