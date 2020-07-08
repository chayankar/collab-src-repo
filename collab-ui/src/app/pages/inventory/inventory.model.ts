export class Inventory {

    public seller: string[];
    public commodityType: string[];
    public manufacturer: string[];
    public availableCommodity: Commodity[];
    
    constructor() {
        this.availableCommodity = [];
        this.commodityType = [];
        this.seller = [];
        this.manufacturer = [];
    }
}

export class Commodity {
    public productName: string;
    public productType: string;
    public unitPresent: number;
    public pricePerUnit: number;
    public productSeller: string;
    public manufacturer: string;
}
