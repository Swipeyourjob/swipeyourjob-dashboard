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
    public getUserinfo() : any | null {
        return this.parseJwt(this.getToken());
    }
    private parseJwt(token: string | null) : object | null  {
        try{
            if(token != null){
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            }else{
                return null;
            }
        }catch( e){
            return null;
        }
    };
}