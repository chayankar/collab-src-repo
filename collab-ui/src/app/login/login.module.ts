import { Router, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from 'app/services/utility-service/utility.service';
import { HttpService } from 'app/services/http-service/http.service';
import { AesEncryptionService } from 'app/services/encryption-service/aes-encryption.service';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';

export const loginRoute: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoute)
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [UtilityService, HttpService, AesEncryptionService]
})
export class LoginModule { }
