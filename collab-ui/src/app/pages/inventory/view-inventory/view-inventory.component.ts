import { Commodity } from './../inventory.model';
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss'],
  providers: [InventoryService]
})
export class ViewInventoryComponent implements OnInit {

  public inventoryFilterForm: FormGroup;
  public page: number;
  public pageSize: number;
  public collectionSize: number;
  public commodityListVM: Commodity[] = [];
  public isEditRequested: boolean;
  public isFilterRequested: boolean;

  @Input() inventory: Inventory;
  @Output() commodityEdit = new EventEmitter<Commodity>();

  constructor() {
  }

  ngOnInit() {
    Object.assign(this.commodityListVM, this.inventory.availableCommodities);

    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = this.inventory.availableCommodities.length;

    this.initFilterControl();
  }

  initFilterControl() {
    this.inventoryFilterForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      seller: new FormControl(''),
      brand: new FormControl('')
    });
  }

  applyFilter() {
    this.commodityListVM = this.inventory.availableCommodities.filter(x => {
      return x.name.match(this.inventoryFilterForm.controls.name.value) &&
        x.type.match(this.inventoryFilterForm.controls.type.value) &&
        x.seller.match(this.inventoryFilterForm.controls.seller.value) &&
        x.brand.match(this.inventoryFilterForm.controls.brand.value) != null;
    });

    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = this.commodityListVM.length;
  }

  toggleFilter() {
    if (this.isFilterRequested) {
      this.isFilterRequested = false;
    } else {
      this.isFilterRequested = true;
    }
  }

  onPageChange(event) {
    this.page = event;
  }

  edit(commodity: Commodity) {
    const index = this.inventory.availableCommodities.findIndex(x => x.id === commodity.id);
    this.inventory.availableCommodities[index] = commodity;
    this.commodityEdit.emit(commodity);
  }
}
