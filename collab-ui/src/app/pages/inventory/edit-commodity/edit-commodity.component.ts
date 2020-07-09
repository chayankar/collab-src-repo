import { Commodity } from './../inventory.model';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-commodity',
  templateUrl: './edit-commodity.component.html',
  styleUrls: ['./edit-commodity.component.scss']
})
export class EditCommodityComponent implements OnInit {

  @Input() commodityType: string[];
  @Input() seller: string[];
  @Input() manufacturer: string[];
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
        commodityName: new FormControl(this.commodity.productName, [Validators.required]),
        commodityType: new FormControl(this.commodity.productType, [Validators.required]),
        seller: new FormControl(this.commodity.productSeller, [Validators.required]),
        manufacturer: new FormControl(this.commodity.manufacturer, [Validators.required]),
        unit: new FormControl(this.commodity.unitPresent, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        pricePerUnit: new FormControl(this.commodity.pricePerUnit, [Validators.required]),
      });
    }
  }

  saveEdit() {
    debugger;
    const updatedCommodity: Commodity = {
      id: this.commodity.id,
      productName: this.commodityEditForm.controls.commodityName.value,
      productType: this.commodityEditForm.controls.commodityType.value,
      productSeller: this.commodityEditForm.controls.seller.value,
      manufacturer: this.commodityEditForm.controls.manufacturer.value,
      unitPresent: this.commodityEditForm.controls.unit.value,
      pricePerUnit: this.commodityEditForm.controls.pricePerUnit.value,
    }

    this.commodityEditFinished.emit(updatedCommodity);
    this.isEditModeEnabled = false;
  }

  cancelEdit() {
    this.commodityEditCancled.emit();
    this.isEditModeEnabled = false;
  }
}
