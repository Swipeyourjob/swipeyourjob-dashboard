import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Job } from '../_models';
import { Vacancies } from 'app/_models/vacancy';



@Injectable({ providedIn: 'root' })
export class JobService {
    private jobSubject: BehaviorSubject<Job>;
    public job: Observable<Job>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.jobSubject = new BehaviorSubject<Job>(JSON.parse(""));
        this.job = this.jobSubject.asObservable();
    }

    public get jobValue(): Job {
        return this.jobSubject.value;
    }

    create(job: Job) {
        
        return this.http.post(`${environment.apiUrl}/job/create`, job).pipe();
    }

    getAll() {
        return this.http.get<Vacancies[]>(`${environment.apiUrl}/getjobs`);
    }

    getById(id: string) {
        return this.http.get<Job>(`${environment.apiUrl}/getjobs?companyid=${id}`);
    }
}