interface IHash<T> {
    [key: string]: T;
}

export type Asn1 = IHash<Module>;

export class Module {
    public name: string;
    public imports: IHash<Import>;
    public definitions: IHash<Definition>;
    public constants: IHash<Constant>;

    constructor(name: string, imports: IHash<Import> = {},
                definitions: IHash<Definition> = {},
                constants: IHash<Constant> = {}) {
        this.name = name;
        this.imports = imports;
        this.definitions = definitions;
        this.constants = constants;
    }
}

export class Import {
    public moduleFrom: string;
    public importedItems: string[];

    public constructor(moduleFrom: string, importedItems: string[] = []) {
        this.moduleFrom = moduleFrom;
        this.importedItems = importedItems;
    }
}

export class Definition {
    public name: string;
    // TODO
}

export class Constant {
    public name: string;
    // TODO
}
