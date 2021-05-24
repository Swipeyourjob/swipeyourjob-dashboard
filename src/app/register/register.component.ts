import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
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
    
    icons: any = {
        faCheck: faCheck,
        faTimes: faTimes
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
        console.log(this.zipcodecheck.invalidCheck,
            this.zipcodecheck.lengthCheck );
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
                    console.log(data);
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
