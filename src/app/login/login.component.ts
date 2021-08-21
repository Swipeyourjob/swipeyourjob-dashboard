import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { faCheck, faTimes, faExclamationTriangle, faExclamation } from '@fortawesome/free-solid-svg-icons';

import { AuthService, AlertService, TokenStorageService } from '../_services';

import { Title } from '@angular/platform-browser';
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
    emailField: any = {
        empty: false
    }
    passwordField: any = {
        empty: false
    }
    icons: any = {
        faCheck: faCheck,
        faTimes: faTimes,
        faExclamationTriangle: faExclamationTriangle,
        faExclamation: faExclamation
    }
    isLoggedIn = false;
    isLoginFailed = false;
    roles: string[] = [];
    

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
        private alertService: AlertService, private router: Router, private actRoute: ActivatedRoute, private titleService: Title) { }

    ngOnInit(): void {
    this.titleService.setTitle("SwipeYourJob - Inloggen")
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            window.location.href = '/';
        }
    }

    validateForms(): void {
        if(this.form.email === "") this.emailField.empty = true;

        if(this.form.password ==="") this.form.password.empty = true;
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
                window.location.href = '/';
            },
            err => {
                console.log(err);
                this.alertService.error(err.error.status);
                this.isLoginFailed = true;
            }
        );
    }

}