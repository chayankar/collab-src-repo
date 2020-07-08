import { Commodity } from './../inventory.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss'],
  providers: [InventoryService]
})
export class ViewInventoryComponent implements OnInit {

  public inventory: Inventory = new Inventory();
  public inventoryFilterForm: FormGroup;
  public page: number;
  public pageSize: number;
  public collectionSize: number;
  public commodityListVM: Commodity[] = [];

  constructor(private inventorySvc: InventoryService) {
    this.inventory = this.inventorySvc.getInventory();
    Object.assign(this.commodityListVM, this.inventory.availableCommodity);
    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = this.inventory.availableCommodity.length;
  }

  ngOnInit() {
    this.initFilterControl();
  }

  initFilterControl() {
    this.inventoryFilterForm = new FormGroup({
      commodityName: new FormControl(''),
      commodityType: new FormControl(''),
      seller: new FormControl(''),
      manufacturer: new FormControl('')
    });
  }

  applyFilter() {
    this.commodityListVM = this.inventory.availableCommodity.filter(x => {
      return x.productName.match(this.inventoryFilterForm.controls.commodityName.value) &&
        x.productType.match(this.inventoryFilterForm.controls.commodityType.value) &&
        x.productSeller.match(this.inventoryFilterForm.controls.seller.value) &&
        x.productType.match(this.inventoryFilterForm.controls.manufacturer.value) != null;
    });

    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = this.commodityListVM.length;
  }

  onPageChange(event) {
    this.page = event;
  }

}
