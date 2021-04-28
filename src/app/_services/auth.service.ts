import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';
import { User } from '../_models';


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

    login(emailadress: string, password: string) {
        console.log("in llogin")
        return this.http.post<any>(environment.apiUrl + '/login', {
            emailadress,
            password
        }, httpOptions);
    }

    companyRegister(companyname: string,
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

    logout() {
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


}