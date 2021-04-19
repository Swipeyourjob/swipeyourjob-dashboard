import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({ providedIn: 'root' })
export class AuthService {
    // user: User;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
      // this.user = '{}';
    }
    
    public get userValue(): string {
      // return this.user;
      return "thanks";
    }
    login(username: string, password: string): Observable<any> {
        return this.http.post(environment.apiUrl + 'login', {
          username,
          password
        }, httpOptions);
        //TODO: ADD user TO Sessionstorage 
      }
    
    // TODO:: ask zyad for CRUD api capability GET/POST/PUT/DELETE for users
    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(environment.apiUri + 'login', {
          username,
          email,
          password
        }, httpOptions);
      }


}