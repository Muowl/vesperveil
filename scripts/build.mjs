import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const p = JSON.parse(readFileSync(resolve(root, 'src/palette.json'), 'utf8'));
const c = {};
const set = (color, ...keys) => keys.forEach(key => c[key] = color);
set(p.background, 'editor.background', 'panel.background', 'tab.activeBackground', 'terminal.background');
set(p.deep, 'sideBar.background', 'activityBar.background', 'titleBar.activeBackground', 'titleBar.inactiveBackground', 'editorGroupHeader.tabsBackground', 'statusBar.background', 'statusBar.noFolderBackground');
set(p.surface, 'editorWidget.background', 'editorHoverWidget.background', 'editorSuggestWidget.background', 'input.background', 'dropdown.background', 'quickInput.background', 'notifications.background', 'menu.background', 'tab.inactiveBackground', 'list.hoverBackground', 'editor.lineHighlightBackground');
set(p.foreground, 'foreground', 'editor.foreground', 'terminal.foreground', 'sideBar.foreground', 'activityBar.foreground', 'titleBar.activeForeground', 'statusBar.foreground', 'statusBar.noFolderForeground', 'tab.activeForeground', 'input.foreground', 'dropdown.foreground', 'list.activeSelectionForeground', 'list.inactiveSelectionForeground', 'menu.foreground', 'editorWidget.foreground', 'editorSuggestWidget.foreground', 'notifications.foreground', 'button.foreground', 'quickInput.foreground');
set(p.muted, 'descriptionForeground', 'disabledForeground', 'editorLineNumber.foreground', 'activityBar.inactiveForeground', 'tab.inactiveForeground', 'titleBar.inactiveForeground', 'input.placeholderForeground');
set(p.border, 'panel.border', 'sideBar.border', 'editorWidget.border', 'dropdown.border', 'input.border', 'menu.border', 'editorGroup.border', 'editorIndentGuide.background1');
set(p.muted, 'editorIndentGuide.activeBackground1');
set(p.accent, 'focusBorder', 'activityBar.activeBorder', 'tab.activeBorderTop', 'panelTitle.activeBorder', 'progressBar.background');
set(p.keyword, 'textLink.foreground', 'textLink.activeForeground', 'list.highlightForeground', 'editorCursor.foreground', 'editorLineNumber.activeForeground');
set(p.selection, 'list.activeSelectionBackground', 'list.inactiveSelectionBackground', 'editorSuggestWidget.selectedBackground', 'menu.selectionBackground', 'button.background');
set(p.selection + 'CC', 'editor.selectionBackground', 'editor.inactiveSelectionBackground');
set(p.selection + '80', 'editor.selectionHighlightBackground', 'editor.wordHighlightBackground');
set(p.accent + '50', 'editor.findMatchBackground', 'editor.findMatchHighlightBackground');
set(p.accent, 'editor.findMatchBorder');
set(p.error, 'errorForeground', 'editorError.foreground', 'gitDecoration.deletedResourceForeground', 'editorGutter.deletedBackground');
set(p.warning, 'editorWarning.foreground', 'gitDecoration.modifiedResourceForeground', 'editorGutter.modifiedBackground');
set(p.info, 'editorInfo.foreground');
set(p.success, 'gitDecoration.addedResourceForeground', 'editorGutter.addedBackground');
set(p.success + '18', 'diffEditor.insertedTextBackground');
set(p.error + '18', 'diffEditor.removedTextBackground');
set(p.selection, 'statusBar.debuggingBackground');
set(p.foreground, 'statusBar.debuggingForeground');
for (const [name, value] of Object.entries(p.ansi)) c['terminal.ansi' + name[0].toUpperCase() + name.slice(1)] = value;
const rule = (name, scope, foreground, fontStyle = '') => ({name, scope, settings: {foreground, fontStyle}});
const tokenColors = [
  rule('Default', ['source'], p.foreground),
  rule('Comments', ['comment', 'punctuation.definition.comment'], p.muted, 'italic'),
  rule('Keywords', ['keyword', 'storage.type', 'storage.modifier'], p.keyword),
  rule('Strings', ['string'], p.string),
  rule('Numbers and constants', ['constant.numeric', 'constant.language', 'variable.other.constant'], p.number),
  rule('Functions', ['entity.name.function', 'support.function'], p.function),
  rule('Types', ['entity.name.type', 'entity.name.class', 'entity.name.namespace', 'support.type', 'support.class'], p.type),
  rule('Variables', ['variable', 'meta.definition.variable'], p.foreground),
  rule('Operators and punctuation', ['keyword.operator', 'punctuation'], p.muted),
  rule('Decorators and annotations', ['meta.function.decorator', 'entity.name.function.decorator', 'storage.type.annotation'], p.type),
  rule('String escapes', ['constant.character.escape'], p.number),
  rule('Tags', ['entity.name.tag'], p.keyword),
  rule('Attributes', ['entity.other.attribute-name'], p.function),
  rule('Markdown headings', ['markup.heading'], p.function),
  rule('Invalid', ['invalid'], p.error)
];
const semanticTokenColors = {};
for (const [tokens, color] of [
  [['keyword', 'modifier'], p.keyword], [['string', 'regexp'], p.string],
  [['number', 'enumMember', 'variable.readonly'], p.number],
  [['function', 'method'], p.function],
  [['type', 'class', 'interface', 'enum', 'typeParameter', 'namespace', 'decorator'], p.type],
  [['variable', 'parameter', 'property'], p.foreground], [['operator'], p.muted]
]) for (const token of tokens) semanticTokenColors[token] = {foreground: color, italic: false, bold: false};
semanticTokenColors.comment = {foreground: p.muted, italic: true};
const theme = {$schema: 'vscode://schemas/color-theme', name: 'Vesperveil Dark', type: 'dark', semanticHighlighting: true, colors: c, tokenColors, semanticTokenColors};
const terminal = {name: 'Vesperveil Dark', background: p.background, foreground: p.foreground, cursorColor: p.keyword, selectionBackground: p.selection, ...p.ansi};
for (const [file, data] of [['themes/vesperveil-dark.json', theme], ['ports/windows-terminal/vesperveil.json', terminal]]) {
  const path = resolve(root, file); mkdirSync(dirname(path), {recursive:true}); writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}
console.log('Generated VS Code theme and Windows Terminal scheme.');
