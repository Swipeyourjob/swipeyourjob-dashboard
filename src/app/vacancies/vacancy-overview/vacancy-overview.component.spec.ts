import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyOverviewComponent } from './vacancy-overview.component';

describe('VacancyOverviewComponent', () => {
  let component: VacancyOverviewComponent;
  let fixture: ComponentFixture<VacancyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacancyOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
