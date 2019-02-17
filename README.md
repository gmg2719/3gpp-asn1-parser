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

## Data Structure

### Modules

```jsonc
{
  "moduleName1": {
    "message/IeName1": /* definition of message/IE */,
    "message/IeName1": /* definition of message/IE */,
    ...
  },
  "moduleName2": {
    "message/IeName1": /* definition of message/IE */,
    ...,
    "import": {
      "moduleName1": ["message/IeName1", ...],
      ...
    },
  ...
}
```

### Builtin Types

#### BIT STRING

- Length is not specified

```jsonc
{
  "type": "BIT STRING",
}
```

- Length is constant

```jsonc
{
  "type": "BIT STRING",
  "size": /* constant expression */,
  "inventory": ["constantName"] /* Exist only if size is defined as IE */
}
```

- Length is range

```jsonc
{
  "type": "BIT STRING",
  "start": /* constant expression */,
  "end": /* constant expression */,
  "inventory": ["startConstantName", "endConstantName"] /* Exist only if size is defined as IE */
}
```

#### BOOLEAN

```jsonc
{
  "type": "BOOLEAN"
}
```

#### CHOICE

```jsonc
{
  "type": "CHOICE",
  "content": [
    {
      "name": "message/IeName1",
      "type": /* message/IE type */,
      "condition": "conditionalExpression" /* Exist only if conditional presence is specified */
    },
    ...,
    {
      "name": "..." /* extension marker */
    },
    {
      "extensionAdditionGroup": [
        /* Message/IE definition as above */
      ]
    },
    ...
  ],
  "inventory": ["message/IeName1", ...]
}
```

#### ENUMERATED

```jsonc
{
  "type": "ENUMERATED",
  "content": ["enumName1", ...]
}
```

#### INTEGER

- Value is not specified

```jsonc
{
  "type": "INTEGER"
}
```

- Value is constant

```jsonc
{
  "type": "INTEGER",
  "value": /* constant expression */,
  "inventory": ["constantName"] /* Exist only if value is defined as IE */
```

- Value is range

```jsonc
{
  "type": "INTEGER",
  "start": /* constant expression */,
  "end": /* constant expression */,
  "inventory": ["startConstantName", "endConstantName"] /* Exist only if value is defined as IE */
}
```

#### NULL

```jsonc
{
  "type": "NULL"
}
```

#### OCTET STRING

- Length is not specified

```jsonc
{
  "type": "OCTET STRING",
}
```

- Length is constant

```jsonc
{
  "type": "OCTET STRING",
  "size": /* constant expression */,
  "inventory": ["constantName"] /* Exist only if size is defined as IE */
}
```

- Contained IE is specfied

```jsonc
{
  "type": "OCTET STRING",
  "containing": "message/IeName",
  "inventory": ["message/IeName"]
}
```

- Length is range

```jsonc
{
  "type": "OCTET STRING",
  "start": /* constant expression */,
  "end": /* constant expression */,
  "inventory": ["startConstantName", "endConstantName"] /* Exist only if size is defined as IE */
}
```

#### SEQUENCE

```jsonc
{
  "type": "SEQUENCE",
  "content": [
    {
      "name": "message/IeName1",
      "type": /* Type expression */,
      "optional": true /* Exist only if message/IE is optional */,
      "needCode": "needCode", /* Exist only if need code is specified */,
      "condition": "condition", /* Exist only if conditional presence is specified */
      "default": /* Default value expression (if specified)
                  * Either variable name,
                  * bit string representaion or
                  * integer expression */
    },
    ...,
    {
      "name": "..."
    },
    {
      "extensionAdditionGroup": [
        /* Message/IE definition as above */
      ]
    },
    ...
  ],
  "inventory": ["messageIeName1", ...]
}
```

#### SEQUENCE OF

```jsonc
{
  "type": "SEQUENCE OF",
  "member": "message/IeName",
  "start": /* constant expression */,
  "end": /* constant expression */,
  "inventory": ["message/IeName", "startConstantName", "endConstantName"] /* Exist only if size is defined as IE */
}
```

### Custom Type

```jsonc
{
  "type": "typeName",
  "inventory": ["typeName"]
}
```

### Parameterized Type

```jsonc
{
  /* Exsiting Message/IE definition */
  "parameterizedType": true,
  "parameters": ["message/IeName1", ...],
  "inventory": ["message/IeName1", ...]
}
```

### Type with `WITH COMPONENT` Expression

```jsonc
{
  "type": "typeName",
  "withComponents": [
    {
      "name": "message/IeName1",
      "present": true
    },
    {
      "name": "message/IeName1",
      "absent": true
    },
    ...
  ],
  "inventory": ["message/IeName1", ...]
}
```

### Constants

```jsonc
{
  "type": "INTENGER",
  "value": /* constant expression */,
  "inventory": ["constantName"] /* Exist only if value is defined as IE */
}
```