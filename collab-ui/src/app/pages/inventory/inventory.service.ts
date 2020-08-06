import { Injectable } from '@angular/core';
import { Inventory, Commodity } from './inventory.model';
import { HttpService } from 'app/services/http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpService) { }

  getInventory(): Inventory {
    // this.http.get('/inventory').subscribe((data: Inventory[]) => {

    // });

    const inventory: Inventory = new Inventory();

    for (let index = 0; index < 10; index++) {
      const commodity: Commodity = {
        id: index.toString(),
        name: 'Mustard Oil',
        type: 'Cooking Oil',
        unit: 20,
        price: 100,
        seller: 'Big Bazar',
        brand: 'Tata',
        quantity: '100 gm',
        category: 'FMCG'
      };
      inventory.availableCommodities.push(commodity);
    }

    for (let index = 11; index < 25; index++) {
      const commodity: Commodity = {
        id: index.toString(),
        name: 'Corriander Powder',
        type: 'Spices',
        unit: 20,
        price: 100,
        seller: 'Reliance Fresh',
        brand: 'Everest',
        quantity: '100 gm',
        category: 'FMCG'
      };
      inventory.availableCommodities.push(commodity);
    }

    inventory.seller.push('Big Bazar');
    inventory.seller.push('Reliance Fresh');

    inventory.commodityType.push('Cooking Oil');
    inventory.commodityType.push('Spices');

    inventory.brand.push('Tata');
    inventory.brand.push('Everest');

    return inventory;
  }

}
