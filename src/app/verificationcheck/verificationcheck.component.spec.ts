import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationcheckComponent } from './verificationcheck.component';

describe('VerificationcheckComponent', () => {
  let component: VerificationcheckComponent;
  let fixture: ComponentFixture<VerificationcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationcheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
