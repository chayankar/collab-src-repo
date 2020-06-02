import { Router, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from 'app/services/utility-service/utility.service';

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
  exports: [UserRegistrationComponent],
  providers: [UtilityService]
})
export class UserRegistrationModule { }
