import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService, AuthService } from '../_services';
import { PasswordValidator } from 'app/_helpers/passwordvalidator';
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
        invalid: false,
        length: false
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
    constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, private passwordvalidator: PasswordValidator, private titleService: Title) { }
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
        let regexp: RegExp = /^(\d{4})\s*([A-Z]{2})$/i
        this.dialogChecks.zipcodeNameDialog = true
        let pattern=new RegExp("");
        let result = pattern.test(zipcode);
        
        if (result){
            this.zipcodecheck.invalid = true;
        }
        if(zipcode.length >= 6){
            this.zipcodecheck.length = true
        }

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
