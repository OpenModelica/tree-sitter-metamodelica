[![build-parser](https://github.com/OpenModelica/tree-sitter-metamodelica/actions/workflows/build-parser.yml/badge.svg)](https://github.com/OpenModelica/tree-sitter-metamodelica/actions/workflows/build-parser.yml)

# tree-sitter-metamodelica

An [open-source](OSMC-License.txt) MetaModelica ([MetaModelica 2.0](https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A418188&dswid=-9758))
grammar and highlighting-query for
[tree-sitter](https://github.com/tree-sitter/tree-sitter).

## Dependencies

  - Node.js
  - Docker

## Installation

```bash
npm install
npm run build
```

## Unit Tests

There is a number of tests included. To run all tests defined in
[test/](./test/) just run:

```bash
npm run test
```

### Examples

To test the parser on a MetaModelica file run:

```bash
npx tree-sitter parse examples/Main.mo
```

## Highlighting

There is also a highlighting query included. Make sure that the
[tree-sitter per-user configuration](https://tree-sitter.github.io/tree-sitter/syntax-highlighting#per-user-configuration)
are pointing to the parent directory of `tree-sitter-metamodelica`. So if this
directory is in `/home/USER/workspace/tree-sitter-metamodelica` add
`/home/USER/workspace` to the parser directories:

**config.json**
```json
{
  "parser-directories": [
    "/home/USER/workspace"
  ],
}
```

To test the highlighting configure run:

```bash
npx tree-sitter highlight examples/Main.mo
```

## Usage

Use [Web Tree-sitter](https://github.com/tree-sitter/tree-sitter/blob/master/lib/binding_web/README.md)
`tree-sitter-metamodelica.wasm` in your application:

```typescript
import * as Parser from 'web-tree-sitter'

await Parser.init()
const parser = new Parser

const MetaModelica = await Parser.Language.load(`tree-sitter-metamodelica.wasm`)
parser.setLanguage(MetaModelica)
```

## Current Status

tree-sitter-metamodelica has been tested on a "Save Total" version of the
[Modelica.Fluid.Examples.DrumBoiler.DrumBoiler](./examples/DrumBoiler.mo) which
was successfully parsed and highlighted.

```bash
npx tree-sitter parse examples/DrumBoiler.mo
npx tree-sitter highlight examples/DrumBoiler.mo
```
