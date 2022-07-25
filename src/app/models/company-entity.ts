export class CompanyEntity {
    Id! : string;
    Code!: string;
    Name!: string;
    CEO!:string;
    TurnOver!:number;
    Website!:string;
    StockType!:string;
    lastStockPrice!: number;
}

export class StockEntity{
    Id! : string;
    Code!: string;
    Price!: number;
    Date!: string;
    DateComponent: string | null = "";
    TimeComponent: string| null = "";
}