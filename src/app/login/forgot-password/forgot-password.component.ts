import { Component, OnInit } from '@angular/core';
import { ForgotPassword } from '@app/models';
import { AuthService, AlertService } from '@app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    public forgotPasswordForm: any;

    constructor(private authService: AuthService, private alertService: AlertService) { }

    ngOnInit(): void {
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl("", [Validators.required])
        });
    }

    public validateControl = (controlName: string) => {
        return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
    }
    public hasError = (controlName: string, errorName: string) => {
        return this.forgotPasswordForm.controls[controlName].hasError(errorName)
    }
    public forgotPassword = (forgotPasswordFormValue: any) => {
        const forgotPass = { ...forgotPasswordFormValue };
        const ForgotPassword: ForgotPassword = {
            email: forgotPass.email,
            clientURI: 'http://localhost:4200/login/resetpassword'
        }
        this.authService.forgotPassword(ForgotPassword);
        this.alertService.success('The link has been sent, please check your email to reset your password.', { keepAfterRouteChange: true });
    }
}
