# 3GPP ASN.1 Parser

It parses ASN.1 from a text file and generate a JSON structure

## Dependencies

```sh
npm install jison
```

## Usage

### Package

```js
var parse = require('./3gpp-asn1-parser');
var asn1Json = parse(<asn1Text>);
```

### Module

```js
var parse = require('./parser');
var asn1Json = parse(<asn1Text>);
```

### Command Line

```sh
node parser <file_name>
# ex: node parser 36331-f10.asn1
```