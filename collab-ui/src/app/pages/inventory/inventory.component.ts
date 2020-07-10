import { PopupNotifyService } from './../../services/popup-notify-service/popup-notify.service';
import { HttpService } from 'app/services/http-service/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Inventory, Commodity } from './inventory.model';
import { InventoryService } from './inventory.service';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NotifyLevels } from 'app/constants/alert-level';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: ['./inventory.component.scss'],
  providers: [InventoryService, PopupNotifyService]
})
export class InventoryComponent implements OnInit {

  public inventory: Inventory = new Inventory();
  public commodity: Commodity = null;
  public isEditRequested: boolean;

  private readonly ElementID_EditTab: string = 'editTab';

  @ViewChild('tabSet') tabSet: NgbTabset;

  constructor(private inventorySvc: InventoryService, private popupSvc: PopupNotifyService) {
    this.inventory = inventorySvc.getInventory();
  }

  ngOnInit() {
  }

  onCommodityEdit(commodity: Commodity) {

    debugger;

    this.disableTabChangeWithoutSaving();

    this.commodity = commodity;

    this.isEditRequested = true;

    this.tabSet.select('editTab');

    // this.toggleTabDisable(true);
  }

  disableTabChangeWithoutSaving() {
    this.tabSet.tabChange.subscribe((x: NgbTabChangeEvent) => {
      if (this.isEditRequested && x.activeId === this.ElementID_EditTab) {
        this.popupSvc.showNotification(NotifyLevels.warning, 'Tab change restricted in edit mode');
        x.preventDefault();
      }
    });
  }

  // TODO: Rename to onCommodityEditFinish
  onCommodityEditFinished(updatedCommodity: Commodity) {
    this.isEditRequested = false;
    const index = this.inventory.availableCommodities.findIndex(x => x.id === updatedCommodity.id);
    this.inventory.availableCommodities[index] = updatedCommodity;
    this.commodity = null;
    this.toggleTabDisable(false);
    this.tabSet.select('viewTab');
  }

  // TODO: Rename to onCommodityEditCancel
  onCommodityEditCancled() {
    this.isEditRequested = false;
    this.commodity = null;
    this.toggleTabDisable(false);
    this.tabSet.select('viewTab');
  }

  toggleTabDisable(isEnable: boolean) {
    const disabledTabs = this.tabSet.tabs.filter(x => x.id.toLowerCase() !== this.ElementID_EditTab.toLowerCase());
    disabledTabs.forEach(element => {
      element.disabled = isEnable;
    });
  }
}
