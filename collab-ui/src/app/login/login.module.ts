import { Router, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

export const loginRoute: Routes = [
  { path: '',  component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoute)
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
