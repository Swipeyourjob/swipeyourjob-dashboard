import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { typeSourceSpan } from '@angular/compiler';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
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
        return this.http.get(
            `${environment.apiUrl}/getEstablishmentProfile`,
            httpOptions
        );
    }
}
