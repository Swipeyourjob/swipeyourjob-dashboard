import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/_services';
import { TokenStorageService } from '@app/_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private tokenService: TokenStorageService
    ) {
        // redirect to home if already logged in
        if (this.tokenService.getToken()) {
            this.router.navigate(['/']);
        }
    }
}