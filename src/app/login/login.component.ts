import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService, TokenStorageService } from '../_services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {
        emailadress: null,
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
        }
    }

    getConfigValue(key: string): any{ }
    onSubmit(): void {
        //TODO:: Maak UserInterface ipv const en geef die hier mee.
        const { emailadress, password, rememberMe } = this.form;
        console.log(this.form);
        // reset alerts on submit
        this.alertService.clear();

        //TODO:: Vul UserInterface 
        // this.authService.login(emailadress, password).subscribe(
        //     data => {
        //         this.tokenStorage.saveToken(data.token, rememberMe);
        //         this.tokenStorage.saveUser(data);
        this.tokenStorage.saveToken(emailadress, rememberMe);
        this.tokenStorage.saveUser(password);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
        //         this.roles = this.tokenStorage.getUser().roles;
                this.alertService.success('Welkom', { keepAfterRouteChange: true });
                this.reloadPage();
        //     },
        //     err => {
        //         this.alertService.error("Deze e-mailadres en wachtwoord combinatie is niet bij ons bekend");
        //         //this.errorMessage = "Deze e-mailadres en wachtwoord combinatie is niet bij ons bekend";
        //         this.isLoginFailed = true;
        //     }
        // );
    }

    reloadPage(): void {
        this.router.navigate(['']);
        window.location.reload();

    }
}