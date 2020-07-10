export class Inventory {

    public seller: string[];
    public commodityType: string[];
    public brand: string[];
    public availableCommodities: Commodity[];

    constructor() {
        this.availableCommodities = [];
        this.commodityType = [];
        this.seller = [];
        this.brand = [];
    }
}

export class Commodity {
    public id: string;
    public name: string;
    public type: string;
    public unit: number;
    public price: number;
    public seller: string;
    public brand: string;
}

export class CommodityExcelFormat {
    public Name: string;
    public Unit: number;
    public Price: number;
    public Brand: string;
    public Seller: string;
}
