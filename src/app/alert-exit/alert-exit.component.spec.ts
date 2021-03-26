import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertExitComponent } from './alert-exit.component';

describe('AlertExitComponent', () => {
  let component: AlertExitComponent;
  let fixture: ComponentFixture<AlertExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertExitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
