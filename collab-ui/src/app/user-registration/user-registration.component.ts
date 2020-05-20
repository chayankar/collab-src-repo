import { RegistrationFormModel } from './registration-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  regModel: RegistrationFormModel;
  regForm: FormGroup;
  phoneRegEx = '^((\\+91-?)|0)?[0-9]{10}$';
  emailRegEx = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  strongPasswordRegEx: RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

  constructor() {
    this.regModel = new RegistrationFormModel();
  }

  ngOnInit() {
    this.initRegistrationFormControls();
  }

  initRegistrationFormControls() {
    this.regForm = new FormGroup({
      name : new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegEx)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegEx)]),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required)
    });

    this.regForm.controls.password.valueChanges.subscribe(pwd => this.validatePasswordStrength(pwd));
    this.regForm.controls.password.valueChanges.subscribe(pwd => this.ensurePasswordSymmetry());
    this.regForm.controls.password_confirm.valueChanges.subscribe(pwd_confirm => this.validatePasswordConfirmation(pwd_confirm));
  }

  submitForm(regForm: FormGroup) {
    console.log(this.regForm.controls.name.value + ' ' + this.regForm.controls.phone.value + ' ' + this.regForm.controls.email.value);
  }

  validatePhoneNumber(phnNum) {
    console.log('phone num: ' + phnNum.value);
  }

  validatePasswordStrength(pwd) {
    if (this.strongPasswordRegEx.test(pwd)) {
      this.regForm.controls.password.setErrors(null);
    } else {
      this.regForm.controls.password.setErrors({'incorrect': true});
    }
  }

  ensurePasswordSymmetry() {
    if (this.regForm.controls.password_confirm.touched) {
      this.validatePasswordConfirmation(this.regForm.controls.password_confirm.value)
    } else {
      this.regForm.controls.password.setErrors(null);
    }
  }

  validatePasswordConfirmation(pwd_confirm) {

    const pwd: string = this.regForm.controls.password.value;
    const pwd_conf: string = pwd_confirm;

    if (pwd === pwd_conf) {
      this.regForm.controls.password_confirm.setErrors(null);
    } else {
      this.regForm.controls.password_confirm.setErrors({'incorrect': true});
    }
  }
}
