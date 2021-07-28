import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job, Vacancy, IVacancy, IVacancyList } from '@app/models';
import { JobService } from '@app/services';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-vacancy-details',
    templateUrl: './vacancy-details.component.html',
    styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {
    vacancies : IVacancyList = {
        joblist: [{jobName: "Kassamedewerker", jobid:0, daysValid:50, images:["gakjslsjkfds"] }]
    };
    avaibility = [
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    }
    ];
    matches = [
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"James", achternaam:"Jones",age:23, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Frank", achternaam:"Bovenberg",age:21, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Maddie", achternaam:"Regenachtig",age:17, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dang", achternaam:"Lin-Wang",age:19, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dixie", achternaam:"Normous",age:18, availabilty:this.avaibility}
    ]
    job: Vacancy| undefined;
    visiable= false;
    public icons: any = {
        faCheck: faCheck,
        faTimes: faTimes
    };
    routeParams = this.route.snapshot.paramMap;
    jobidFromRoute = 0;

    constructor( private jobService: JobService, private route: ActivatedRoute,) { 
    }

    ngOnInit(): void {
        this.jobService.getAll().subscribe(
            (data: any) => {
              let vacancies = {... data};
              let vacanciesLength = Object.keys(vacancies.joblist).length;
              if(vacanciesLength > 0){
                  this.vacancies.joblist = vacancies.joblist;
                  console.log(this.vacancies);
              }else{
                  console.log("No active vacancies.");
              }
            },
            (err: any) => {
              console.log("Error while fetching active vacancies: " + err);
            }
        );
        this.jobService.getLikes().subscribe(
            (data) => {
                let likes = {...data};
                console.log(likes);
            },
            (err) => {
                console.log("Error while fetching vacancies likes: " + err);
            }
        );
        this.route.paramMap.subscribe(params => {
            this.jobidFromRoute = Number(this.route.snapshot.paramMap.get("vacancyId"));
          });
    }

    viewVacancy(vacancy:any, index:number): void {
        console.log( this.visiable);
        console.log( this.jobidFromRoute);
        this.visiable= !this.visiable;
    }

    updateLikeStatus(): void{
        this.jobService.getLikes().subscribe(
            (data) => {
                let likes = {...data};
                console.log(likes);
            },
            (err) => {
                console.log("Error while fetching vacancies likes: " + err);
            }
        );
    }
    getLength(): Number{
        
        return this.vacancies.joblist.length
    }
}
