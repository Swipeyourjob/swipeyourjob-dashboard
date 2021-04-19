import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    login() {

        this.alertService.clear();
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password);
            this.router.navigateByUrl('/');
            this.alertService.success("Logged in.")
        }
    }
    reloadPage(): void {
        window.location.reload();
      }
    // onSubmit() {
    //     this.submitted = true;

    //     // reset alerts on submit
    //     this.alertService.clear();

    //     // stop here if form is invalid
    // if (this.form.invalid) {
    //     return;
    // }

    //     this.loading = true;
    //     this.authService.login(this.f.username.value, this.f.password.value)
    //         .pipe(first())
    //         .subscribe({
    //             next: () => {
    //                 // get return url from query parameters or default to home page
    //                 const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //                 this.router.navigateByUrl(returnUrl);
    //             },
    //             error: error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             }
    //         });
    // }
}