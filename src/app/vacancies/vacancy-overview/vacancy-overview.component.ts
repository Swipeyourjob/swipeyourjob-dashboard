import { Component, OnInit } from '@angular/core';
import { JobService } from 'app/_services/job.service';

@Component({
  selector: 'app-vacancy-overview',
  templateUrl: './vacancy-overview.component.html',
  styleUrls: ['./vacancy-overview.component.css']
})
export class VacancyOverviewComponent implements OnInit {

  constructor(private jobService : JobService) { }

  activeVacancies = [];

  ngOnInit(): void {
    this.jobService.getAll().subscribe(
      (data: any) => {
        let vacancies = {... data};
        let vacanciesLength = Object.keys(vacancies.joblist).length;
        if(vacanciesLength > 0){
            this.activeVacancies = vacancies.joblist;
        }else{
            console.log("No active vacancies.");
        }
      },
      (err: any) => {
        console.log("Error while fetching active vacancies: " + err);
      }
    )
  }
}
