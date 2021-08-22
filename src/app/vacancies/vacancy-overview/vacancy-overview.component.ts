import { Component, OnInit } from '@angular/core';
import { Vacancy } from '@app/models';
import { JobService } from 'app/_services/job.service';

@Component({
  selector: 'app-vacancy-overview',
  templateUrl: './vacancy-overview.component.html',
  styleUrls: ['./vacancy-overview.component.css']
})
export class VacancyOverviewComponent implements OnInit {

  constructor(private jobService : JobService) { }

  initialized = false;
  inactiveVacancies : Vacancy[] = [];
  activeVacancies : Vacancy[] = [];

  ngOnInit(): void {
    this.jobService.getAll().subscribe(
      (data: any) => {
        let vacancies = {... data};
        let vacanciesLength = Object.keys(vacancies.joblist).length;
        if(vacanciesLength > 0){
          for (let i = 0; i < vacanciesLength; i++) {
            let vacancy = vacancies.joblist[i];
            console.log(vacancy);
            if (vacancy.status === 'Valid' || 'Unlimited') {
              this.activeVacancies.push(vacancy);
            } else {
              this.inactiveVacancies.push(vacancy);
            }
          }
        }else{
            console.log("No active vacancies.");
        }
        this.initialized = true;
      },
      (err: any) => {
        console.log("Error while fetching active vacancies: " + err);
      }
    )
  }
}
