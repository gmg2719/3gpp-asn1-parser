import {Asn1, Module} from './types';

const asn1: Asn1 = {};
const eUtraInterndoeDefinitions: Module = new Module('myModule');
asn1[eUtraInterndoeDefinitions.name] = eUtraInterndoeDefinitions;

console.log(asn1);
