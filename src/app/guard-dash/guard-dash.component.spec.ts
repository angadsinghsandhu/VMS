import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardDashComponent } from './guard-dash.component';

describe('GuardDashComponent', () => {
  let component: GuardDashComponent;
  let fixture: ComponentFixture<GuardDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
