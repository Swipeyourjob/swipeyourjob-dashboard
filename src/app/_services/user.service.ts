import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';// '@environments/environment';
import { User } from '../_models';// '@app/_models';

const baseUrl = `${environment.apiUrl}/users`;

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private http: HttpClient) { }
  
    getPublicContent(): Observable<any> {
      return this.http.get(baseUrl + 'all', { responseType: 'text' });
    }
  
    getUserBoard(): Observable<any> {
      return this.http.get(baseUrl + 'user', { responseType: 'text' });
    }
  
    getModeratorBoard(): Observable<any> {
      return this.http.get(baseUrl + 'mod', { responseType: 'text' });
    }
  
    getAdminBoard(): Observable<any> {
      return this.http.get(baseUrl + 'admin', { responseType: 'text' });
    }
  }
