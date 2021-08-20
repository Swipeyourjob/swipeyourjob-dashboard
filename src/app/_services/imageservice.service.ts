import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { typeSourceSpan } from '@angular/compiler';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { Establishments, imageFile } from '@app/models';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const httpUploadOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryaAtadyAGLG0QYbt3' })
};

@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {
    constructor(
        private router: Router,
        private http: HttpClient,
        private tokenService: TokenStorageService
    ) {

    }
    public uploadCompanyImg(imageFile: any): Observable<HttpEvent<any>> {
      
      let formData: FormData = new FormData();
      formData.append('imageFile', imageFile);
      return this.http.post<HttpEvent<any>>(`${environment.apiUrl}/uploadimage`, formData);
  }
}
