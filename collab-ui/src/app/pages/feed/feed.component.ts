import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public products: any[] = [];
  public prodHeader: string[] = ['Product Name', 'Product Type', 'Unit Present', 'Price/Unit', 'Product Seller', 'Manufacturer'];
  public prodProps: any[] = ['ProductName', 'ProductType', 'UnitPresent', 'PricePerUnit', 'ProductSeller', 'Manufacturer'];

  constructor() {
    const item = {
      ProductName: 'Mustard Oil',
      ProductType: 'Cooking Oil',
      UnitPresent: 20,
      PricePerUnit: 100,
      ProductSeller: 'Big Bazar',
      Manufacturer: 'Tata'
    };
    this.products.push(item);
    this.products.push(item);
    this.products.push(item);
    this.products.push(item);
    this.products.push(item);
  }
  ngOnInit() {
  }

}
