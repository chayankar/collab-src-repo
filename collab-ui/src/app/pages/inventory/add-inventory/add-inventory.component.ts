import { Commodity } from './../inventory.model';
import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../inventory.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

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
      pricePerUnit: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });
  }

  ngOnInit() {
  }

  saveCommodity() {
    // TODO: save entry in database. Update inventory list view after successfull saving using component interaction / event.
  }
}
