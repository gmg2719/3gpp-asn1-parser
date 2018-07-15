# 3GPP ASN.1 Parser

It parses ASN.1 from a text file and generate a JSON structure

## Installation

```sh
npm i third-gen-asn1-parser
```

## Usage

### Package

```js
var parse = require('third-gen-asn1-parser');
var asn1Json = parse(<asn1Text>);
```

### Command Line

```sh
node parser <file_name>
# ex: node parser 36331-f10.asn1
```