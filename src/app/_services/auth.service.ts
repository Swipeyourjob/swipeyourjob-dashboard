import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';
import { User, NewPassword, Response, Company } from '@app/models';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private tokenService: TokenStorageService
    ) {

    }

    public login(email: string, password: string) {
        console.log("in llogin")
        return this.http.post<Response>(environment.apiUrl + '/login', {
            email,
            password
        }, httpOptions);
    }
    public verify(email: string, verficationcode: string) {
        console.log("Verify code ")
        return this.http.post<any>(environment.apiUrl + '/verifcationcodeLogin', {
            email,
            verficationcode
        }, httpOptions);
    }

    public companyRegister(companyInfo:Company) {
        return this.http.post(environment.apiUrl + '/newCompany', companyInfo, httpOptions);
    }

    //Sets the new password for user based on e-mail and unique code.
    public setNewPassword(newPassword: NewPassword) {
        return this.http.post(environment.apiUrl + '/resetPassword', newPassword, httpOptions);
    }

    public logout() {
        return this.tokenService.signOut();
    }

    public isLoggedIn() {
        if (this.tokenService.getToken() || this.tokenService.getRememberMe()) {
            return true;
        }
        else {
            return false;
        }
    }

    //Sends a verification email to specified e-mailaddress.
    public forgotPassword(email: string) {
        return this.http.post<Response>(environment.apiUrl + '/forgotpassword', {
            email
        }, httpOptions);
    }
}
