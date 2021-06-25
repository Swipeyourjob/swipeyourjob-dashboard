import { Component, OnInit,  } from '@angular/core';

@Component({
    selector: 'app-vacancy-details',
    templateUrl: './vacancy-details.component.html',
    styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {
    vacancies = [
        {name: "Kassamedewerker"}, 
        {name:"Brood afdeling"}, 
        {name:"Vulploegmedewerker"}, 
        {name:"Magazijn"}, 
        {name:"Kantoor"}
    ];
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
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility}
    ]

    constructor() { 

     }

    ngOnInit(): void {

    }

    viewVacancy(e:any): void {
        console.log(e);
    }

    updateLikeStatus(): void{

    }
}
