import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

import * as moment from "moment";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({ providedIn: 'root' })
export class AuthService {
    // user: User;

    constructor(
        private router: Router,
        private http: HttpClient,
        private tokenService: TokenStorageService
    ) {
      // this.user = '{}';
    }

    login(username: string, password: string) {
        console.log("in llogin")
        return this.http.post<any>(environment.apiUri + '/login', {
          username,
          password
        }, httpOptions)
        .subscribe( (res) => {
            this.tokenService.saveToken(res.token);
            this.tokenService.saveUser(res)
        }
            //
        ); 
      }
    
    // TODO:: ask zyad for CRUD api capability GET/POST/PUT/DELETE for users
    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(environment.apiUri + 'login', {
          username,
          email,
          password
        }, httpOptions);
      }         

    logout() {
       return this.tokenService.signOut();
    }

    public isLoggedIn() {
        return this.tokenService.getToken();
    }   


}