export interface IHash<T> {
    [key: string]: T;
}

export type Asn1 = IHash<Module>;

export class Module {
    public name: string;
    public imports: IHash<Import>;
    public definitions: IHash<IDefinition>;
    public constants: IHash<Constant>;

    constructor(name: string, imports: IHash<Import> = {},
                definitions: IHash<RootIe> = {},
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

interface IDefinition {
    Expand(): void;
}

export class RootIe implements IDefinition {
    public name: string;
    public ie: IDefinition;

    constructor(name: string, ie: IDefinition = null) {
        this.name = name;
        this.ie = ie;
    }

    public Expand(): void {
        return;
    }
}

export class Enumerated implements IDefinition {
    public items: string[];

    constructor(items: string[] = []) {
        this.items = items;
    }

    public Expand(): void {
        return;
    }
}

export class Constant {
    public name: string;
    public value: number;
}
