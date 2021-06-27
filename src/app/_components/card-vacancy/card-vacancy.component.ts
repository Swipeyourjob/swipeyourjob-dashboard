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
    console.log(this.vacancy);
  }

  getUrl()
  {
    return `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)), url(${this.vacancy.images[0]}) no-repeat center center`;
  }
}
