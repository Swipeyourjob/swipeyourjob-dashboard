import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from 'app/_models/vacancy';
import {faMapMarkerAlt, faClock, faEuroSign} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'card-vacancy',
  templateUrl: './card-vacancy.component.html',
  styleUrls: ['./card-vacancy.component.css']
})
export class CardVacancyComponent implements OnInit {
  public icons: any = {
    faMapMarkerAlt: faMapMarkerAlt,
    faClock: faClock,
    faEuroSign: faEuroSign
  };

  constructor() {
  }

  @Input() vacancy!: Vacancy;

  ngOnInit(): void {
    if (this.vacancy.daysValid < 0) {
      this.vacancy.daysValid = 0;
    }
  }

  getUrl1(): string {
    return `url(${this.vacancy.images[0]})`;
  }

  getUrl2(): string {
    return `webkit-linear-gradient(url(${this.vacancy.images[0]})`;
  }

  getFilter(): string {
    return this.vacancy.daysValid <= 0 ? 'grayscale(100%)' : '';
  }
}
