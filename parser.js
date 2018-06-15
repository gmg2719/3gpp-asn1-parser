var fs = require('fs');
var jison = require('jison');
var path = require('path');
var bnf = fs.readFileSync(path.resolve(__dirname, 'asn1.jison'), 'utf8');
var parser = new jison.Parser(bnf);

module.exports = exports = parse;

function parse(input) {
    return parser.parse(input);
}

if (require.main == module) {
    if (process.argv.length >= 3) {
        let input = fs.readFileSync(process.argv[2], 'utf8');
        console.log(JSON.stringify(parse(input), null, 2));
    } else {
        console.log('Usage: node parser <file_name>');
        console.log('  ex : node parser 36331-f10.asn1');
    }
}