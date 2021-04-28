import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REMEMBER_ME = 'remember-me';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    constructor() { }
    signOut(): void {
        window.sessionStorage.clear();
        window.localStorage.clear();
    }

    public saveToken(token: string, rememberMe: boolean): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
        if(rememberMe){
            window.localStorage.setItem(REMEMBER_ME, token);
        }
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public getRememberMe(): string | null {
        return window.localStorage.getItem(REMEMBER_ME);; 
    }
    
    public useRememberMe(): void {
        var rememberMetoken =  this.getRememberMe();
        if (rememberMetoken){
            this.saveToken(rememberMetoken, false);
        }
            
    }

    public saveUser(user: any): void {
        //TODO: Decode JWT token and put user data in _models or Session Storage
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }
}