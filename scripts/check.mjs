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
const ansiNames = ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White', 'BrightBlack', 'BrightRed', 'BrightGreen', 'BrightYellow', 'BrightBlue', 'BrightMagenta', 'BrightCyan', 'BrightWhite'];
const paletteNames = ['black', 'red', 'green', 'yellow', 'blue', 'purple', 'cyan', 'white', 'brightBlack', 'brightRed', 'brightGreen', 'brightYellow', 'brightBlue', 'brightPurple', 'brightCyan', 'brightWhite'];
assert.equal(Object.keys(t.colors).filter(key => key.startsWith('terminal.ansi')).length, 16);
for (const [index, name] of ansiNames.entries()) assert.equal(t.colors['terminal.ansi' + name], p.ansi[paletteNames[index]], `ANSI ${name}`);
for (const [fg, bg] of [
  ['button.foreground', 'button.background'], ['button.foreground', 'button.hoverBackground'],
  ['button.secondaryForeground', 'button.secondaryBackground'], ['button.secondaryForeground', 'button.secondaryHoverBackground'],
  ['badge.foreground', 'badge.background'], ['activityBarBadge.foreground', 'activityBarBadge.background'],
  ['inputOption.activeForeground', 'inputOption.activeBackground'], ['quickInputList.focusForeground', 'quickInputList.focusBackground']
]) {
  const ratio = contrast(t.colors[fg], t.colors[bg]);
  assert.ok(ratio >= 4.5, `${fg} on ${bg}: ${ratio}`);
  console.log(`${bg}: ${ratio.toFixed(2)}:1`);
}
// Alpha backgrounds must be composited before checking selected syntax text.
const composite = (overlay, background) => {
  const alpha = overlay.length === 9 ? parseInt(overlay.slice(7), 16) / 255 : 1;
  return '#' + [1,3,5].map(i => Math.round(parseInt(overlay.slice(i,i+2),16)*alpha + parseInt(background.slice(i,i+2),16)*(1-alpha)).toString(16).padStart(2,'0')).join('');
};
for (const key of ['editor.selectionBackground', 'editor.findMatchBackground', 'editor.findMatchHighlightBackground']) {
  const background = composite(t.colors[key], p.background);
  for (const token of ['foreground', 'muted', 'keyword', 'function', 'type', 'string', 'number']) {
    assert.ok(contrast(p[token], background) >= 4.5, `${token} on ${key}`);
  }
}
for (let i = 1; i <= 6; i++) assert.ok(contrast(t.colors[`editorBracketHighlight.foreground${i}`], p.background) >= 4.5);
assert.equal(wt.background,t.colors['terminal.background']);
for (const r of t.tokenColors) if (r.settings.fontStyle.includes('italic')) assert.equal(r.name,'Comments');
for (const [key, style] of Object.entries(t.semanticTokenColors)) if(style.italic) assert.equal(key,'comment');
assert.equal(Object.keys(p.ansi).length,16);
console.log('Color syntax, text contrast, italic policy and terminal parity passed.');
