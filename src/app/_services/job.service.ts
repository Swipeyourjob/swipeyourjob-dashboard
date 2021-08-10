import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Job, VacancyUpdate } from '@app/models';
import { VacancyList } from 'app/_models/vacancy';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class JobService {
    // private jobSubject: BehaviorSubject<Job>;
    // public job: Observable<Job>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.jobSubject = new BehaviorSubject<Job>(JSON.parse(""));
        // this.job = this.jobSubject.asObservable();
    }

    //  public get jobValue(): Job {
    //  return this.jobSubject.value;
    //    }

    public createJob(job: Job) {
        console.log("CreateJob: ", job);
        return this.http.post(environment.apiUrl + '/newjob', job, httpOptions);
    }
    

    getAll() {
        return this.http.get<Job[]>(`${environment.apiUrl}/getjobs`);
    }
    getLikes(){
        return this.http.get<any>(`${environment.apiUrl}/getlikes?status=liked`)
    }
    getLikesById(id: number,filter: string){
        return this.http.get<any>(`${environment.apiUrl}/getlikes/${id}?status=${filter}`)
    }
    getById(id: string) {
        return this.http.get<Job>(`${environment.apiUrl}/getjobs?companyid=${id}`);
    }
    public updateJobStatus(status:VacancyUpdate){
        return this.http.post(`${environment.apiUrl}/updateJobStatus`, status, httpOptions);
    }
}
