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
    let commodity: Commodity = {
      productName: 'Mustard Oil',
      productType: 'Cooking Oil',
      unitPresent: 20,
      pricePerUnit: 100,
      productSeller: 'Big Bazar',
      manufacturer: 'Tata'
    };

    for (let index = 0; index < 90; index++) {
      inventory.availableCommodity.push(commodity);
    }

    commodity = {
      productName: 'Corriander Powder',
      productType: 'Spices',
      unitPresent: 20,
      pricePerUnit: 100,
      productSeller: 'Reliance Fresh',
      manufacturer: 'Everest'
    };

    for (let index = 0; index < 90; index++) {
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
