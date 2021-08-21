import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacancy, IVacancyList, VacancyUpdate, UpdateSolication } from '@app/models';
import { JobService } from '@app/services';
import { faCheck, faTimes, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { CreateRoomRequest } from 'app/_models/chat';
import { ChatService } from 'app/_services/chat.service';

@Component({
    selector: 'app-vacancy-details',
    templateUrl: './vacancy-details.component.html',
    styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {
    vacancies: IVacancyList = {
        joblist: [{jobName: 'Kassamedewerker', jobid: 0, daysValid: 50, images: ['gakjslsjkfds'] , amountofreactions: 0, amountofrejections: 0}]
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
        { profileImg: 'test',
          jobid: 0,
          voornaam: 'placeholder',
          achternaam: 'placeholder',
          // workexperience: 'placeholder',
          age: 26,
          availabilty: this.avaibility,
          userid: 'placeholder',
          status: ''
        }
    ];
    newroom: CreateRoomRequest | undefined;
    updateresponse: UpdateSolication | undefined;
    job: Vacancy| undefined;
    visiable = false;
    public icons: any = {
        faCheck,
        faTimes,
        faCommentDots
    };

    jobidFromRoute = 0;
    likedlist: any = [];

    constructor(
        public chatService: ChatService,
        private jobService: JobService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.jobidFromRoute = Number(this.route.snapshot.paramMap.get('vacancyId'));
            this.loadMatchesByJobId(this.jobidFromRoute);
        });
        this.jobService.getAll().subscribe(
            (data: any) => {
            const vacancies = {... data};
            const vacanciesLength = Object.keys(vacancies.joblist).length;
            if (vacanciesLength > 0){
                this.vacancies.joblist = vacancies.joblist;

            }else{
                console.log('No active vacancies.');
            }
            },
            (err: any) => {
            console.log('Error while fetching active vacancies: ' + err);
            }
        );

    }

    loadMatchesByJobId(id: number): void{
        this.jobService.getLikesById(id, 'liked,accepted').subscribe(
            (data) => {
                this.matches = [];
                for (let i = 0; i < data.length; i++){
                    const person = data[i];
                    const newperson =  {
                        profileImg: person.profileurl,
                        voornaam: person.firstname,
                        achternaam: person.lastname,
                        age: person.age,
                        availabilty: this.avaibility,
                        userid: person.userid,
                        jobid: person.jobid,
                        status: person.status
                    };
                    this.matches.push(newperson);
                }
            }
            , (err) => {});

    }
    chatwithuser(userid: string, jobid: number): void {
        this.newroom =  {
            chatjobid: jobid,
            chatname: `${jobid}-${userid}`,
            roomGuest: [userid]
        };

        this.chatService.createRoom(this.newroom).subscribe(
            (data) => {
                if (data.ok){
                    this.chatService.getrooms();
                }

            },
            (err) => {
                console.log(err);
            }
        );
    }
    viewVacancy(vacancy: any, index: number): void {
        console.log( this.visiable);
        console.log( this.jobidFromRoute);
        const jobid = this.jobidFromRoute;
        this.visiable = !this.visiable;
    }


    updateStatus(useridstring: string, status: boolean, matchnumber: number): void{
        const updateObject: VacancyUpdate = new VacancyUpdate();
        updateObject.userid = useridstring;
        updateObject.jobid = matchnumber;
        updateObject.status = (status) ? 'accepted' : 'rejected';
        console.log(updateObject);


        this.jobService.updateJobStatus(updateObject).subscribe(
            (data: any) => {
                console.log(data);
                this.updateresponse = data;
                if (this.updateresponse?.ok){
                    this.matches.forEach(function(element){
                        if (element.userid === updateObject.userid && updateObject.jobid == element.jobid){
                            element.status = updateObject.status; // laatste error in deze file!
                        }
                        return element;
                    });
                }else{
                    console.log('nok');
                }
            },
            (err) => {

            }
        );
    }


}
