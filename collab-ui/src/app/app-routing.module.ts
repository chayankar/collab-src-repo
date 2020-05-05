import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  }
];
