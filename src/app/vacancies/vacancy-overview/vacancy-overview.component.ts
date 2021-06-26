import { Component, OnInit } from '@angular/core';
import { JobService } from 'app/_services/job.service';

@Component({
  selector: 'app-vacancy-overview',
  templateUrl: './vacancy-overview.component.html',
  styleUrls: ['./vacancy-overview.component.css']
})
export class VacancyOverviewComponent implements OnInit {

  constructor(private jobService : JobService) { }

  ngOnInit(): void {
    console.log("test");
  }

}
