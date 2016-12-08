import f from 'odata-filter-builder'; 

export class MediaQuery {

    static readonly defaultCount:number = 50;
    public readonly query:f;

    public skip: number;

    public top: number; 

    public constructor(condition?: "and"  | "or") {
        this.query = f(condition);
        this.skip = 0;
        this.top = MediaQuery.defaultCount;
    }

}