import { Router, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';

export const registerRoute: Routes = [
  { path: '',  component: UserRegistrationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(registerRoute)
  ],
  declarations: [UserRegistrationComponent],
  exports: [UserRegistrationComponent]
})
export class UserRegistrationModule { }
