import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacancy-overview',
  templateUrl: './vacancy-overview.component.html',
  styleUrls: ['./vacancy-overview.component.css']
})
export class VacancyOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('hi!');
  }

}
