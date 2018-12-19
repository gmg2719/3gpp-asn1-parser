import {Asn1, Module, RootIe, Enumerated} from './types';

const asn1: Asn1 = {};
const eUtraInterndoeDefinitions: Module = new Module('module1');
const rootIe: RootIe = new RootIe('rootIe', new Enumerated());

eUtraInterndoeDefinitions.definitions[rootIe.name] = rootIe;
asn1[eUtraInterndoeDefinitions.name] = eUtraInterndoeDefinitions;

console.log(asn1);
