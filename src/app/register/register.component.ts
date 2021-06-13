import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { faCheck, faTimes, faExclamationTriangle, faExclamation } from '@fortawesome/free-solid-svg-icons';
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
        companyname: "",
        zipcode: "",
        kvk: "",
        email: "",
        password: "",
        passwordrepeat: "",
        subscribe: false,
        terms: false
    };

    companyNameField: any = {
        empty: false
    }
    zipcodeField: any = {
        empty: false
    }
    kvkField: any = {
        empty: false,
        taken: false
    }
    
    icons: any = {
        faCheck: faCheck,
        faTimes: faTimes,
        faExclamationTriangle: faExclamationTriangle,
        faExclamation: faExclamation
    }
    passwordchecks: any = {
        passwordCapitalCheck: false,
        passwordNumberCheck: false,
        passwordLengthCheck: false
    };
    zipcodecheck: any = {
        invalidCheck: false,
        lengthCheck: false
    };
    passwordvalidrepeat: boolean = false;
    dialogChecks: any = {
        companyNamedialog: false,
        zipcodeNameDialog: false,
        emailNameDialog: false,
        passwordDialog: false,
        passwordRepeatDialog: false,
        kvkdDialog: false
    };

    isLoggedIn = false;
    constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, private passwordvalidator: PasswordValidator, private titleService: Title, private zipcodeValidator: ZipcodeValidator) { }
    passwordchange(event: KeyboardEvent): void {
        let password = this.form.password;
        
        this.dialogChecks.passwordDialog = true;
        this.passwordchecks.passwordCapitalCheck = this.passwordvalidator.checkCapital(password);
        this.passwordchecks.passwordNumberCheck = this.passwordvalidator.checkNumber(password);
        this.passwordchecks.passwordLengthCheck = this.passwordvalidator.checkLength(password);
    }
    passwordrepeatf(event: KeyboardEvent): void {
        const { passwordrepeat, password } = this.form;
        let passval = this.passwordvalidator.passwordeqauls(password, passwordrepeat);
        this.dialogChecks.passwordRepeatDialog = !passval;
    }
    adddialog(attributeName: string): void {
        this.dialogChecks[attributeName] = true;
    }
    zipcodechange():void {
        let zipcode = this.form.zipcode;

        this.dialogChecks.zipcodeNameDialog = true
        this.zipcodecheck.invalidCheck = this.zipcodeValidator.checkRegex(zipcode);
        this.zipcodecheck.lengthCheck = this.zipcodeValidator.checkLength(zipcode);
    }
    ngOnInit(): void {
        console.log(this.form);
        this.titleService.setTitle("SwipeYourJob - Registeren")
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
        }
    }
    onSubmit(): void {
        this.authService.companyRegister(this.form).subscribe(
            data => {
                if(data.hasOwnProperty("token")){
                    if((data as any).token == 'Check mail') {
                        this.router.navigate(['/registered']);
                    }
                    }
            },
            err => {
                if((err as any).error.text == 'Kvk is already taken') {
                    this.kvkField.taken = true;
                }
            }
        );
    }

    validateForms(): void {
        let name = this.form.companyname;
        if(name === "") this.companyNameField.empty = true;

        let zip = this.form.zipcode;
        if(zip ==="") this.zipcodeField.empty = true;

        let kvk = this.form.kvk;
        if(kvk === "" || kvk.length != 8) this.kvkField.empty = true;

        if(this.companyNameField.empty || this.zipcodeField.empty || this.kvkField.empty) {
            const el = document.getElementById('#scrollId');
            el!.scrollIntoView();
        }
    }
    
    back() {
        this.router.navigate(['/login']);
    }
}
