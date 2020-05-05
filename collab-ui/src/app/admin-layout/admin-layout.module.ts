import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminLayoutRoutes } from './admin-layout.routing';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(AdminLayoutRoutes)
  ],
  declarations: []
})
export class AdminLayoutModule { }
