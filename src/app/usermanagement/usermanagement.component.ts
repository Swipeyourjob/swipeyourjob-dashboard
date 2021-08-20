import { Title } from '@angular/platform-browser';
import {Component, OnInit, OnChanges} from '@angular/core';
import {PasswordValidator} from 'app/_helpers/passwordvalidator';
import {AuthService, TokenStorageService} from '@app/services';

@Component({
  selector: 'app-verification',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  form: any = {
    password: null
  };
  passwordchecks: any = {
    passwordCapitalCheck: false,
    passwordNumberCheck: false,
    passwordLengthCheck: false
  };
  dialogChecks: any = {
    passwordDialog: false
  };
  isLoggedIn = false;
  passwordOk = true;

  constructor(private titleService: Title,private authService: AuthService, private passwordvalidator: PasswordValidator) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("SwipeYourJob - Verificatie")
    return;
  }

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
}
