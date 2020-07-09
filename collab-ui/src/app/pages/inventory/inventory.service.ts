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
        productName: 'Mustard Oil',
        productType: 'Cooking Oil',
        unitPresent: 20,
        pricePerUnit: 100,
        productSeller: 'Big Bazar',
        manufacturer: 'Tata'
      };
      inventory.availableCommodity.push(commodity);
    }

    for (let index = 11; index < 25; index++) {
      const commodity = {
        id: index.toString(),
        productName: 'Corriander Powder',
        productType: 'Spices',
        unitPresent: 20,
        pricePerUnit: 100,
        productSeller: 'Reliance Fresh',
        manufacturer: 'Everest'
      };
      inventory.availableCommodity.push(commodity);
    }

    inventory.seller.push('Big Bazar');
    inventory.seller.push('Reliance Fresh');

    inventory.commodityType.push('Cooking Oil');
    inventory.commodityType.push('Spices');

    inventory.manufacturer.push('Tata');
    inventory.manufacturer.push('Everest');

    return inventory;
  }

}
