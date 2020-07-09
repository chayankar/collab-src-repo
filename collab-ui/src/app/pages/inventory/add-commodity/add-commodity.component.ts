import { Component, OnInit } from '@angular/core';
import { Inventory, Commodity } from '../inventory.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-commodity',
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.scss']
})
export class AddCommodityComponent implements OnInit {
  public inventory: Inventory;
  public commodityList: Commodity[] = [];
  public commodityForm: FormGroup;

  constructor(private inventorySvc: InventoryService) {
    this.inventory = this.inventorySvc.getInventory();

    this.commodityForm = new FormGroup({
      commodityName: new FormControl('', [Validators.required]),
      commodityType: new FormControl('', [Validators.required]),
      seller: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      pricePerUnit: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  saveCommodity() {
    debugger;
    // TODO: save entry in database. Update inventory list view after successfull saving using component interaction / event.
  }

}
