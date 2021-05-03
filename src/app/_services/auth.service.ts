import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';
import { User, ForgotPassword } from '@app/models';


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

    public login(emailadress: string, password: string) {
        console.log("in llogin")
        return this.http.post<any>(environment.apiUrl + '/login', {
            emailadress,
            password
        }, httpOptions);
    }

    public companyRegister(companyname: string,
        zipcode: string,
        kvk: string,
        email: string,
        password: string,
        passwordrepeat: string,
        mails: string,
        privacy: string) {
        return this.http.post(environment.apiUrl + '/newCompany', {
            companyname,
            zipcode,
            kvk,
            email,
            password,
            passwordrepeat,
            mails,
            privacy
        }, httpOptions);
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

    public forgotPassword(forgotinfo: ForgotPassword) {
        // throw new Error('Method not implemented.');
        console.log(forgotinfo);
        //TODO :: add api call to send mailinfo to server
        return true;
    }


}