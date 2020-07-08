import { HttpService } from 'app/services/http-service/http.service';
import { Component, OnInit } from '@angular/core';
import { Inventory } from './inventory.model';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: ['./inventory.component.scss'],
  providers: [InventoryService]
})
export class InventoryComponent implements OnInit {

  public inventory: Inventory = new Inventory();

  constructor(private inventorySvc: InventoryService) {
  }

  ngOnInit() {
  }
}
