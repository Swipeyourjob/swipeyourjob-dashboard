import {Component, OnInit, OnChanges} from '@angular/core';
import {PasswordValidator} from 'app/_helpers/passwordvalidator';
import {AuthService, TokenStorageService} from '@app/services';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
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

  constructor(private authService: AuthService, private passwordvalidator: PasswordValidator) {
  }

  ngOnInit(): void {
    return;
  }

  validatePassword(): void {
    console.log('validate password');
    const password = this.form.password;
    this.dialogChecks.passwordDialog = true;
    this.passwordchecks.passwordCapitalCheck = this.passwordvalidator.checkCapital(password);
    this.passwordchecks.passwordNumberCheck = this.passwordvalidator.checkNumber(password);
    this.passwordchecks.passwordLengthCheck = this.passwordvalidator.checkLength(password);
    console.log(this.passwordchecks);
  }

  onSubmit(): void {
    const {
      password
    } = this.form;
    if (this.passwordchecks.passwordCapitalCheck && this.passwordchecks.passwordNumberCheck && this.passwordchecks.passwordLengthCheck) {
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
