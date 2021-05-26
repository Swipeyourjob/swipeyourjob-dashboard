import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService, TokenStorageService } from '../_services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {
        email: null,
        password: null,
        rememberMe: false
    };
    isLoggedIn = false;
    isLoginFailed = false;
    roles: string[] = [];

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
        private alertService: AlertService, private router: Router) { }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            window.location.href = '/';
        }
    }

    getConfigValue(key: string): any{ }
    onSubmit(f :NgForm): void {
        const { email, password, rememberMe } = this.form;
        // reset alerts on submit
        this.alertService.clear();
        this.authService.login(email, password).subscribe(
            data => {
                this.tokenStorage.saveToken(data.token, rememberMe);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
                //this.alertService.success('Login succesvol', { keepAfterRouteChange: true });
                //this.router.navigate(['/home']);
                //this.reloadPage();
                //Seems to be best method
                window.location.href = '/';
            },
            err => {
                this.alertService.error("Deze combinatie van e-mailadres en wachtwoord is niet bij ons bekend");
                //this.errorMessage = "Deze e-mailadres en wachtwoord combinatie is niet bij ons bekend";
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage(): void {
        this.router.navigate(['']);
        window.location.reload();

    }
}