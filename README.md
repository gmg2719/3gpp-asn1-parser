# 3GPP ASN.1 Parser

It parses 3GPP RRC (36.331, 38.331) ASN.1 text into a JSON structure

## Installation

```sh
npm i third-gen-asn1-parser
```

## Usage

### Package

```js
var parse = require('third-gen-asn1-parser');
var asn1Json = parse(asn1Text));
```

### Command Line

```sh
node parser <file_name>
# ex: node parser 36331-f10.asn1
```
