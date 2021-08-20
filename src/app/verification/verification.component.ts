import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {Component, OnInit, OnChanges} from '@angular/core';
import {PasswordValidator} from 'app/_helpers/passwordvalidator';
import { ChangedPassword, NewPassword } from '@app/models';
import {AuthService, TokenStorageService} from '@app/services';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  
  isLoggedIn = false;

  form: ChangedPassword = { 
    password: "",
    password2: ""
  };

  email: any;
  code: any;


  passwordchecks: any = {
    passwordCapitalCheck: false,
    passwordNumberCheck: false,
    passwordLengthCheck: false
  };
  dialogChecks: any = {
    passwordDialog: false
  };
  passwordOk = true;

  constructor(private titleService: Title, private authService: AuthService, private tokenStorage: TokenStorageService, private passwordvalidator: PasswordValidator, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle("Swipe Your Job - Wachtwoord wijzigen")
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.activatedRoute.queryParams.subscribe(params => {
      //console.log(params);
      this.email = params['emai'];
      this.code= parseInt(params['code']);
    });
  }

  public validatePassword(): void {
    const newPasswordForm: NewPassword = { password: this.form.password, email: this.email, code: this.code };
    console.log(newPasswordForm);
    this.authService.setNewPassword(newPasswordForm).subscribe(
        data => {
            console.log(data);
            //this.alertService.success('The link has been sent, please check your email to reset your password.', { keepAfterRouteChange: true });               
        },
        err => {
            console.log(err);
        }
    );
  }

  /*
  validatePassword(): boolean {
    console.log('validate password');
    const password = this.form.password;
    this.dialogChecks.passwordDialog = true;
    this.passwordchecks.passwordCapitalCheck = this.passwordvalidator.checkCapital(password);
    this.passwordchecks.passwordNumberCheck = this.passwordvalidator.checkNumber(password);
    this.passwordchecks.passwordLengthCheck = this.passwordvalidator.checkLength(password);
    console.log(this.passwordchecks);
    this.passwordOk =
      this.passwordchecks.passwordCapitalCheck &&
      this.passwordchecks.passwordNumberCheck &&
      this.passwordchecks.passwordLengthCheck;
    console.log(this.passwordOk);
    return this.passwordOk;
  }
  onSubmit(): void {
    const {
      password
    } = this.form;
    if (this.passwordOk) {
      this.authService.companySetPassword(
        password
      ).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  */
}
