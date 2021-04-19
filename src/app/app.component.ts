import { Component } from '@angular/core';
import {AuthService} from '@app/_services/'
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {

    constructor(private authService: AuthService) {
        this.authService.isLoggedIn();
    }
    
    logout() {
        this.authService.logout();
    }
 }