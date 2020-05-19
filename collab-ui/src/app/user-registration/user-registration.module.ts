import { Router, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration.component';

export const registerRoute: Routes = [
  { path: '',  component: UserRegistrationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(registerRoute)
  ],
  declarations: [UserRegistrationComponent],
  exports: [UserRegistrationComponent]
})
export class UserRegistrationModule { }
