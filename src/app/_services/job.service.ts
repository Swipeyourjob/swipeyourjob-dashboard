import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Company, Job} from '../_models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class JobService {
  private jobSubject: BehaviorSubject<Job>;
  public job: Observable<Job>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.jobSubject = new BehaviorSubject<Job>(JSON.parse('{}'));
    this.job = this.jobSubject.asObservable();
  }

  public get jobValue(): Job {
    return this.jobSubject.value;
  }

  public createJob(job: any) {
    return this.http.post(environment.apiUrl + '/newjob', job, httpOptions);
  }

  getAll() {
    return this.http.get<Job[]>(`${environment.apiUrl}/getjobs`);
  }

  getById(id: string) {
    return this.http.get<Job>(`${environment.apiUrl}/getjobs?companyid=${id}`);
  }
}
