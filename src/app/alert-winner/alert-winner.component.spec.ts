import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWinnerComponent } from './alert-winner.component';

describe('AlertWinnerComponent', () => {
  let component: AlertWinnerComponent;
  let fixture: ComponentFixture<AlertWinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertWinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
