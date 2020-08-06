import { Commodity } from './../inventory.model';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-commodity',
  templateUrl: './edit-commodity.component.html'
})
export class EditCommodityComponent implements OnInit {

  @Input() commodityType: string[];
  @Input() seller: string[];
  @Input() brand: string[];
  @Input() commodity: Commodity;
  @Output() commodityEditFinished = new EventEmitter<Commodity>();
  @Output() commodityEditCancled = new EventEmitter<Commodity>();
  commodityEditForm: FormGroup;
  isEditModeEnabled = false;

  constructor() {

  }

  ngOnInit() {
    this.isEditModeEnabled = this.commodity ? true : false;
    if (this.commodity) {
      this.commodityEditForm = new FormGroup({
        name: new FormControl(this.commodity.name, [Validators.required]),
        type: new FormControl(this.commodity.type, [Validators.required]),
        seller: new FormControl(this.commodity.seller, [Validators.required]),
        brand: new FormControl(this.commodity.brand, [Validators.required]),
        unit: new FormControl(this.commodity.unit, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        price: new FormControl(this.commodity.price, [Validators.required]),
        quantity: new FormControl(this.commodity.quantity, [Validators.required]),
        category: new FormControl(this.commodity.category, [Validators.required]),
      });
    }
  }

  saveEdit() {
    debugger;
    const updatedCommodity: Commodity = {
      id: this.commodity.id,
      name: this.commodityEditForm.controls.commodityName.value,
      type: this.commodityEditForm.controls.commodityType.value,
      seller: this.commodityEditForm.controls.seller.value,
      brand: this.commodityEditForm.controls.manufacturer.value,
      unit: this.commodityEditForm.controls.unit.value,
      price: this.commodityEditForm.controls.pricePerUnit.value,
      quantity: this.commodityEditForm.controls.quantity.value,
      category: this.commodityEditForm.controls.category.value,
    }

    this.commodityEditFinished.emit(updatedCommodity);
    this.isEditModeEnabled = false;
  }

  cancelEdit() {
    this.commodityEditCancled.emit();
    this.isEditModeEnabled = false;
  }
}
