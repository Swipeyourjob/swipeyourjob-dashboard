import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REMEMBER_ME = 'remember-me';

@Injectable({
    providedIn: 'root',
})
export class TokenStorageService {
    constructor() { }
    signOut(): void {
        window.sessionStorage.clear();
        window.localStorage.clear();
    }

    public saveToken(token: string, rememberMe: boolean): void {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
        if(rememberMe){
            window.localStorage.setItem(REMEMBER_ME, token);
        }
    }

    public getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    public getRememberMe(): string | null {
        return window.localStorage.getItem(REMEMBER_ME);
    }

    public useRememberMe(): void {
        var rememberMetoken = this.getRememberMe();
        if (rememberMetoken) {
            this.saveToken(rememberMetoken, false);
        }
    }

    public saveUser(user: any): void {
        //TODO: Decode JWT token and put user data in _models or Session Storage
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }
    public getUserInfo(): any | null {
        return this.parseJwt(this.getToken());
    }
    private parseJwt(token: string | null): object | null {
        try {
            if (token != null) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map(function (c) {
                            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                        })
                        .join('')
                );
                return JSON.parse(jsonPayload);
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }
    //Closure for TokenStorage
    public DoToken(t: any) {
        var storedToken = this.parseJwt(t);;
        var that = this;
        return {
            deleteToken( t: any) {
                storedToken = null;
            },
            retrieveToken() {
                return storedToken;
            },
        };
    }
}
