import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacancy, IVacancyList, VacancyUpdate } from '@app/models';
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
        {profileImg: "test", jobid: 0,voornaam:"placeholder", achternaam:"placeholder",age:26, availabilty:this.avaibility, userid:'placeholder'}
    ]
    job: Vacancy| undefined;
    visiable= false;
    public icons: any = {
        faCheck: faCheck,
        faTimes: faTimes
    };
    jobidFromRoute = 0;
    likedlist: any = [];

    constructor( private jobService: JobService, private route: ActivatedRoute,) { 
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.jobidFromRoute = Number(this.route.snapshot.paramMap.get("vacancyId"));
            this.loadMatchesByJobId(this.jobidFromRoute);
        });
        this.jobService.getAll().subscribe(
            (data: any) => {
            let vacancies = {... data};
            let vacanciesLength = Object.keys(vacancies.joblist).length;
            if(vacanciesLength > 0){
                this.vacancies.joblist = vacancies.joblist;
                
            }else{
                console.log("No active vacancies.");
            }
            },
            (err: any) => {
            console.log("Error while fetching active vacancies: " + err);
            }
        );
        
    }

    loadMatchesByJobId(id: number) : void{
        this.jobService.getLikesById(id).subscribe(
            (data) => {
                this.matches = [];
                for(let i = 0; i < data.length; i++){
                    let person = data[i];
                    let newperson =  {
                        profileImg: person['profileurl'], 
                        voornaam:person['firstname'], 
                        achternaam:person['lastname'],
                        age:person['age'], 
                        availabilty:this.avaibility,
                        userid:person['userid'],
                        jobid: person["jobid"]
                    };
                    this.matches.push(newperson);
                }
            }
            ,(err) => {});
        
    }
    
    viewVacancy(vacancy:any, index:number): void {
        console.log( this.visiable);
        console.log( this.jobidFromRoute);
        let jobid = this.jobidFromRoute;
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
    updateStatus(userid : string,status:boolean, matchnumber:number) : void{
        console.log(userid);    
        console.log(status);
        console.log(matchnumber);
        let updateObject:  VacancyUpdate = new VacancyUpdate();
        updateObject.userid = userid;
        updateObject.jobid = matchnumber;
        updateObject.status = (status)?'accepted':'rejected';
        this.jobService.updateJobStatus(updateObject).subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {

            }
        );
    }

    getLength(): Number{
        
        return this.vacancies.joblist.length
    }
}
