import { ImportCommodityComponent } from './../../pages/inventory/import-commodity/import-commodity.component';
import { HttpService } from 'app/services/http-service/http.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedComponent } from 'app/pages/feed/feed.component';
import { InventoryComponent } from 'app/pages/inventory/inventory.component';
import { ViewInventoryComponent } from 'app/pages/inventory/view-inventory/view-inventory.component';
import { EditCommodityComponent } from 'app/pages/inventory/edit-commodity/edit-commodity.component';
import { AddCommodityComponent } from 'app/pages/inventory/add-commodity/add-commodity.component';

@NgModule({
  imports: [
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    FeedComponent,
    InventoryComponent,
    ViewInventoryComponent,
    EditCommodityComponent,
    AddCommodityComponent,
    ImportCommodityComponent
  ],
  providers: [HttpService]
})

export class AdminLayoutModule { }
