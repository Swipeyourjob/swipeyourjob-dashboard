import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
    isLoggedIn = false;
    isLoginFailed = false;
    roles: string[] = [];
    parent_component = this.actRoute.parent; 

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
        private alertService: AlertService, private router: Router, private actRoute: ActivatedRoute, private titleService: Title) { }

    ngOnInit(): void {
    this.titleService.setTitle("SwipeYourJob - Inloggen")
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
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
                this.alertService.success('Welkom', { keepAfterRouteChange: true });
                this.reloadPage();
            },
            err => {
                // this.alertService.error(err.error.status);
                // console.log(err);

                let errorMessage = "Deze e-mailadres en wachtwoord combinatie is niet bij ons bekend";
                this.alertService.error(errorMessage);
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage(): void {
        this.router.navigateByUrl('home');
    }
}