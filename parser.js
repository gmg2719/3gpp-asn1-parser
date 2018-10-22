var fs = require('fs');
// var jison = require('jison');
var path = require('path');
// var bnf = fs.readFileSync(path.resolve(__dirname, 'asn1.jison'), 'utf8');
// var parser = new jison.Parser(bnf);
var parser = require('./asn1').parser;

exports.parse = parse;
exports.getAsn1ByName = getAsn1ByName;
exports.getUniqueMessageIE = getUniqueMessageIE;

function parse(input) {
    return parser.parse(input);
}

function getAsn1ByName(name, asn1Json) {
    let ret = {};
    for (let moduleName in asn1Json) {
        let moduleJson = asn1Json[moduleName];
        if (name in moduleJson) {
            ret[moduleName] = moduleJson[name];
        }
    }
    return ret;
}

function getUniqueMessageIE(messageIEname, asn1Json, moduleName) {
    if (moduleName) {
        // 1. Search in the current module
        if (moduleName in asn1Json &&
            Object.keys(asn1Json[moduleName]).includes(messageIEname)) {
                return Object.assign(JSON.parse(JSON.stringify(
                                        asn1Json[moduleName][messageIEname])),
                                     {module: moduleName, constants: {}});
        }
        // 2. Search in moduleName's import (list of list)
        for (let importedModuleName in asn1Json[moduleName].import) {
            let importedModule = asn1Json[moduleName]['import'][importedModuleName];
            if (importedModule.includes(messageIEname)) {
                return Object.assign(
                            JSON.parse(JSON.stringify(
                                asn1Json[importedModuleName][messageIEname])),
                            {module: importedModuleName, constants: {}});
            }
        }
    }
    let messageIEs = getAsn1ByName(messageIEname, asn1Json);
    let modules = Object.keys(messageIEs);
    let idx = 0;
    switch (modules.length) {
        case 0:
            throw `No message/IE found`;
            break;
        case 1:
            break;
        default:
            console.log(`'${messageIEname}' is defined in multiple modules.`);
            for (let i = 0; i < modules.length; i++) {
                console.log(`${i}: ${modules[i]}`);
            }
            let idx = readline.questionInt('Which one? ');
            break;
    }
    return Object.assign(JSON.parse(JSON.stringify(messageIEs[modules[idx]])),
                         {module: modules[idx], constants: {}});
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