# Revisão de saturação — Vesperveil 0.2.0

Paleta aprovada em 03/10/2026 para dar mais vida ao código, preservando o fundo
vinho escuro e a hierarquia visual do tema.

## Paleta aprovada

| Papel | 0.1.0 | 0.2.0 | Contraste sobre o fundo do editor |
|---|---|---|---|
| Acentos da interface | `#C65A70` | `#DA5676` | 4,88:1 |
| Palavras-chave | `#DB91A3` | `#ED829F` | 7,27:1 |
| Funções | `#D7B77D` | `#E5B55F` | 9,73:1 |
| Tipos | `#B5A5CF` | `#BE9BE9` | 7,93:1 |
| Strings | `#A8BEA0` | `#9FCB8F` | 10,00:1 |
| Números | `#DCAD91` | `#EFA777` | 9,17:1 |
| Informação | `#96B9CA` | `#82BFDF` | 9,17:1 |
| Erros | `#F08080` | `#F27D88` | 7,07:1 |
| Avisos | `#E2C184` | `#F0C36C` | 11,15:1 |
| Sucesso | `#A8BEA0` | `#9FCB8F` | 10,00:1 |

O rosa ganha presença; o dourado fica mais quente; lavanda e verde ficam menos
acinzentados. As cores ANSI regulares e claras acompanham esses tons nos dois
terminais. A paleta-base continua em `src/palette.json`, com exportações geradas
por `scripts/build.mjs`.

Fundos `background`, `deep` e `surface`, texto `foreground`, comentários `muted`,
seleção `selection`, hover `hover` e bordas `border` mantêm os valores da 0.1.0.
O ícone mantém o dourado aprovado `#D7B77D`; sua geometria e cor não dependem da
cor usada para funções no editor.

## Verificação

- `npm run build` regenera o tema do VS Code e o esquema do Windows Terminal.
- `npm run check` passa para as cores aprovadas: sintaxe, comentários, controles,
  pares de colchetes e texto sobre seleção e busca com transparência calculada.
- As 16 correspondências ANSI dos dois formatos continuam consistentes.
- A primeira comparação em Python e TypeScript foi renderizada no navegador
  com as regras TextMate do tema; ela não simulava o realce semântico de extensões.
- Depois da aprovação, o tema foi aplicado em VS Code 1.140.0 via code-server
  no Linux. As cores efetivas de fundo, texto, foco e links foram conferidas na
  interface; palavras-chave também foram verificadas no editor de ambas as
  linguagens antes da captura.
- O VSIX 0.2.0 foi empacotado com `@vscode/vsce` 4.0.0 e instalado com sucesso
  em um diretório de extensões isolado. Manifesto, tema, ícone e capturas do
  pacote foram comparados com os arquivos do repositório.
- O README inclui novas capturas reais de
  [TypeScript](screenshots/vesperveil-typescript.png) e
  [Python](screenshots/vesperveil-python.png), em 1600 × 900, sem recoloração ou
  montagem. TypeScript usa os recursos integrados do VS Code; Python foi
  conferido com sua gramática TextMate integrada, sem extensão de realce semântico.

Os testes verificam os pares e papéis definidos no projeto. A distribuição de
cores depende da gramática da linguagem e das extensões instaladas.
