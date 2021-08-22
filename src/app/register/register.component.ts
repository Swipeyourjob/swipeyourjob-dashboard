import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import {faCheck, faTimes, faExclamationTriangle, faExclamation, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService, AuthService } from '@app/services';
import { PasswordValidator, ZipcodeValidator } from '@app/helpers';
import { Title } from '@angular/platform-browser';
import { Company } from '@app/models';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: Company = {
        companyname: '',
        zipcode: '',
        kvk: '',
        email: '',
        password: '',
        passwordrepeat: '',
        subscribe: false,
        terms: false
    };

    companyNameField: any = {
        empty: false
    };
    zipcodeField: any = {
        empty: false
    };
    kvkField: any = {
        empty: false,
        taken: false
    };
    icons: any = {
        faCheck: faCheck,
        faTimes: faTimes,
        faExclamationTriangle: faExclamationTriangle,
        faExclamation: faExclamation,
      faArrowLeft: faArrowLeft
    };
    passwordChecks: any = {
        passwordCapitalCheck: false,
        passwordNumberCheck: false,
        passwordLengthCheck: false
    };
    zipcodeChecks: any = {
        invalidCheck: false,
        lengthCheck: false
    };
    kvkChecks: any = {
        lengthCheck: false
    };
    passwordvalidrepeat = false;
    dialogChecks: any = {
        companyNamedialog: false,
        zipcodeNameDialog: false,
        emailNameDialog: false,
        passwordDialog: false,
        passwordRepeatDialog: false,
        kvkdDialog: false
    };
    capsOn: any;

    isLoggedIn = false;
    constructor(
      private router: Router,
      private authService: AuthService,
      private tokenStorage: TokenStorageService,
      private passwordvalidator: PasswordValidator,
      private titleService: Title,
      private zipcodeValidator: ZipcodeValidator
    ) { }
    passwordchange(event: KeyboardEvent): void {
        const password = this.form.password;
        this.dialogChecks.passwordDialog = true;
        this.passwordChecks.passwordCapitalCheck = this.passwordvalidator.checkCapital(password);
        this.passwordChecks.passwordNumberCheck = this.passwordvalidator.checkNumber(password);
        this.passwordChecks.passwordLengthCheck = this.passwordvalidator.checkLength(password);
    }
    passwordrepeatf(event: KeyboardEvent): void {
        const { password, passwordrepeat } = this.form;
        const passval = this.passwordvalidator.passwordequals(password, passwordrepeat);
        this.dialogChecks.passwordRepeatDialog = !passval;
    }
    adddialog(attributeName: string): void {
        this.dialogChecks[attributeName] = true;
    }
    zipcodechange(): void {
        const zipcode = this.form.zipcode;

        this.dialogChecks.zipcodeNameDialog = true;
        this.zipcodeChecks.invalidCheck = this.zipcodeValidator.checkRegex(zipcode);
        this.zipcodeChecks.lengthCheck = this.zipcodeValidator.checkLength(zipcode);
    }
    kvkchange(): void {
        const kvk = this.form.kvk;
        const kvkBool = (kvk.length > 8);
        this.dialogChecks.kvkdDialog = true;
        this.kvkChecks.lengthCheck = kvkBool;
    }
    ngOnInit(): void {
        console.log(this.form);
        this.titleService.setTitle('SwipeYourJob - Registeren');
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
        }
    }
    onSubmit(): void {
        this.authService.companyRegister(this.form).subscribe(
            data => {
                if (data.hasOwnProperty('token')){
                    if ((data as any).token === 'Check mail') {
                        this.router.navigate(['/registered']);
                    }
                    }
            },
            err => {
                if ((err as any).error.text === 'Kvk is already taken') {
                    this.kvkField.taken = true;
                }
            }
        );
    }

    validateForms(): void {
        const name = this.form.companyname;
        if (name === '') { this.companyNameField.empty = true; }

        const zip = this.form.zipcode;
        if (zip === '') { this.zipcodeField.empty = true; }

        const kvk = this.form.kvk;
        if (kvk === '' || kvk.length !== 8) { this.kvkField.empty = true; }

        if (this.companyNameField.empty || this.zipcodeField.empty || this.kvkField.empty) {
            const el = document.getElementById('#scrollId');
            el!.scrollIntoView();
        }
    }

    back(): void {
        this.router.navigate(['/login']);
    }
}
