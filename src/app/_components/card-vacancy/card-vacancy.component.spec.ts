import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVacancyComponent } from './card-vacancy.component';

describe('CardVacancyComponent', () => {
  let component: CardVacancyComponent;
  let fixture: ComponentFixture<CardVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardVacancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
