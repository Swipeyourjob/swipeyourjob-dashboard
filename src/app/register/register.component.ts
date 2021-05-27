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
    passwordvalidrepeat: boolean = false;
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
    constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, private passwordvalidator: PasswordValidator, private titleService: Title, private zipcodeValidator: ZipcodeValidator) { }
    passwordchange(event: KeyboardEvent): void {
        let password = this.form.password;
        
        this.dialogChecks.passwordDialog = true;
        this.passwordChecks.passwordCapitalCheck = this.passwordvalidator.checkCapital(password);
        this.passwordChecks.passwordNumberCheck = this.passwordvalidator.checkNumber(password);
        this.passwordChecks.passwordLengthCheck = this.passwordvalidator.checkLength(password);
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
        this.zipcodeChecks.invalidCheck = this.zipcodeValidator.checkRegex(zipcode);
        this.zipcodeChecks.lengthCheck = this.zipcodeValidator.checkLength(zipcode);
    }
    kvkchange():void {
        let kvk = this.form.kvk;
        let kvkBool = (kvk.length <= 8) ? false : true;
        this.dialogChecks.kvkdDialog = true;
        this.kvkChecks.lengthCheck = kvkBool;
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
                    console.log(err);
                }
            );
    }
    
    back() {
        this.router.navigate(['/login']);
    }

}
