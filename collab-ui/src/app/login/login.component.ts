import { HttpService } from './../services/http-service/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AesEncryptionService } from 'app/services/encryption-service/aes-encryption.service';
import { LoginResponse } from 'app/models/LoginResponse';
import { EncryptionKey } from 'app/models/EncryptionKey';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGrp: FormGroup;
  encryptKey: EncryptionKey;

  constructor(private httpService: HttpService, private encryptionSvc: AesEncryptionService) { }

  ngOnInit() {
    this.initPasswordEncryptKey();
    this.initLoginForm();
  }

  initPasswordEncryptKey() {
    this.httpService.get('api/encryptionKey').subscribe((data: EncryptionKey) => {
      this.encryptKey = data;
    });
  }

  initLoginForm() {
    this.loginFormGrp = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  tryLogin() {

    const encryptextPwd = this.encryptionSvc.encrypt(this.encryptKey, this.loginFormGrp.controls.password.value);
    const loginCred = {email: this.loginFormGrp.controls.email.value, password: encryptextPwd};

    this.httpService.post('api/Login', loginCred).subscribe((data: LoginResponse) => {
      debugger
      console.log(data);
    });

    console.log(encryptextPwd);
  }
}
