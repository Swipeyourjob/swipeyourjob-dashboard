import { Component, Input, OnInit } from '@angular/core';
import { Vacancy } from 'app/_models/vacancy';

@Component({
  selector: 'card-vacancy',
  templateUrl: './card-vacancy.component.html',
  styleUrls: ['./card-vacancy.component.css']
})
export class CardVacancyComponent implements OnInit {

  constructor() { }

  @Input() vacancy!: Vacancy;

  ngOnInit(): void {
    if(this.vacancy.daysValid < 0)
      this.vacancy.daysValid = 0;
  }

  getUrl1()
  {
    return `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.45)), url(${this.vacancy.images[0]}) no-repeat center center`;
  }

  getUrl2()
  {
    return `webkit-linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.45)), url(${this.vacancy.images[0]}) no-repeat center center`;
  }

  getFilter()
  {
    return this.vacancy.daysValid <= 0 ? 'grayscale(100%)' : '';
  }
}
