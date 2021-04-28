import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { faCheck,faTimes  } from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService } from '../_services';
import { PasswordValidator } from 'app/_helpers/passwordvalidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    passwordrepeat: null,
    password: null
  };
  icons: any = {
    faCheck:faCheck,
    faTimes: faTimes
  }
  passwordchecks: any = {
    passwordCapitalCheck  : false,
    passwordNumberCheck   : false,
    passwordLengthCheck   : false
  };
  passwordvalidrepeat  :boolean   = false;
  dialogChecks: any = {
    companyNamedialog : false,
    zipcodeNameDialog: false,
    emailNameDialog: false,
    passwordDialog : false,
    passwordRepeatDialog : false
  };
  

  isLoggedIn = false;
  constructor(private tokenStorage: TokenStorageService, private passwordvalidator: PasswordValidator) {}
  passwordchange(event: KeyboardEvent): void {
    let password      = this.form.password;
    this.dialogChecks.passwordDialog = true;
    this.passwordchecks.passwordCapitalCheck = this.passwordvalidator.checkCapital(password);
    this.passwordchecks.passwordNumberCheck = this.passwordvalidator.checkNumber(password);
    this.passwordchecks.passwordLengthCheck = this.passwordvalidator.checkLength(password);
  }
  passwordrepeatf(event: KeyboardEvent): void{
    const {passwordrepeat,password} = this.form;
    let passval = this.passwordvalidator.passwordeqauls(password,passwordrepeat);
    this.dialogChecks.passwordRepeatDialog = !passval;
  }
  adddialog(attributeName: string): void{
    this.dialogChecks[attributeName] = true;
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit(): void {
    
  }

}
