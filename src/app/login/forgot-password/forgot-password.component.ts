import { Component, OnInit } from '@angular/core';
import { ForgotPassword } from '@app/models';
import { TokenStorageService, AuthService, AlertService } from '@app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    form: ForgotPassword = { 
        email: ""
    };

    isLoggedIn = false;

    //public forgotPasswordForm: any;

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private alertService: AlertService, private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("SwipeYourJob - Wachtwoord Vergeten")
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
        }
        //this.forgotPasswordForm = new FormGroup({
            // TODO:: ASK ZYAD of validatie aan beide kanten nodig zijn. aan de front-end en/of back-end?
        //    email: new FormControl("", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
        //});
    }
    getConfigValue(key: string): any{}
    public validateControl = (controlName: string) => {
        //return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
    }
    public hasError = (controlName: string, errorName: string) => {
       // return this.forgotPasswordForm.controls[controlName].hasError(errorName)
    }
    public forgotPassword(): void {
        console.log(this.form.email);
        this.authService.forgotPassword(this.form.email).subscribe(
            data => {
                console.log(data);
                this.alertService.success('The link has been sent, please check your email to reset your password.', { keepAfterRouteChange: true });               
            },
            err => {
                console.log("Error: " + err);
            }
        );
    }
}
