import { Component } from '@angular/core';
import { AuthService, TokenStorageService } from './_services';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private roles: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;

    constructor(
        private router: Router, private tokenStorageService: TokenStorageService, private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("HMMM");
        this.tokenStorageService.useRememberMe();
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

            this.username = user.username;
        }
    }

    logout(): void {
        this.tokenStorageService.signOut();
        // window.location.reload();
        this.router.navigate(['/login']);
    }
    
}
