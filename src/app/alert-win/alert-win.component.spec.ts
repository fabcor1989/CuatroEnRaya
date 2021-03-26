import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWinComponent } from './alert-win.component';

describe('AlertWinComponent', () => {
  let component: AlertWinComponent;
  let fixture: ComponentFixture<AlertWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertWinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
