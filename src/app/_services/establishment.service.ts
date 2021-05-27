import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { typeSourceSpan } from '@angular/compiler';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { Establishment, Response } from '@app/models';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class EstablishmentService {
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private tokenService: TokenStorageService
    ) {

    }
    public getUserEstamblishments() {
        return this.http.get<Establishment>(`${environment.apiUrl}/getEstablishmentProfile`,httpOptions);
    }
    public getEstamblishmentByID(id: number){
        return this.http.get(`${environment.apiUrl}/getEstablishmentProfile/${id}`,httpOptions);
    }
}
