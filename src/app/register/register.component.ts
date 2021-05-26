import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService, AuthService } from '../_services';
import { PasswordValidator } from 'app/_helpers/passwordvalidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    companyname: null,
    zipcode: null,
    kvk: null,
    email: null,
    password: null,
    passwordrepeat: null,
    subscribe: "",
    terms: ""
  };
  icons: any = {
    faCheck: faCheck,
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
    passwordRepeatDialog : false,
    kvkdDialog : false
  };


  isLoggedIn = false;
  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, private passwordvalidator: PasswordValidator) {}
  passwordchange(event: KeyboardEvent): void {
    let password      = this.form.password;
    this.dialogChecks.passwordDialog = true;
    this.passwordchecks.passwordCapitalCheck = this.passwordvalidator.checkCapital(password);
    this.passwordchecks.passwordNumberCheck = this.passwordvalidator.checkNumber(password);
    this.passwordchecks.passwordLengthCheck = this.passwordvalidator.checkLength(password);
  }
  passwordrepeatf(event: KeyboardEvent): void {
    const {passwordrepeat,password} = this.form;
    let passval = this.passwordvalidator.passwordeqauls(password,passwordrepeat);
    this.dialogChecks.passwordRepeatDialog = !passval;
  }
  adddialog(attributeName: string): void {
    this.dialogChecks[attributeName] = true;
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit(): void {
    const { companyname, zipcode, kvk, email, password } = this.form;
    const subscribe = "";
    const terms = "";

    this.authService.companyRegister(companyname, zipcode, kvk, email, password, subscribe, terms).subscribe(
      data  => {
        if(data.hasOwnProperty("token")){
          if((data as any).token == 'Check mail') {
            this.router.navigate(['/registered']);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  back() {
    this.router.navigate(['/login']);
  }
}
