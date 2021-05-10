import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { typeSourceSpan } from '@angular/compiler';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})

export class EstablishmentService {


  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenStorageService) {
    let token = tokenService.getToken();
   
    let headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append('Authorization', "bearer " + token );
    const httpOptions = {
      headers: headers_object,
    };
     }
  public getUserEstamblishments(){
    console.log(httpOptions);
    return this.http.get(`${environment.apiUrl}/getEstablishmentProfile`,httpOptions);
  }
}
