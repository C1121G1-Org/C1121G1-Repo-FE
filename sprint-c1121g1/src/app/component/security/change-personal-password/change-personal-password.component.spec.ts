import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePersonalPasswordComponent } from './change-personal-password.component';

describe('ChangePersonalPasswordComponent', () => {
  let component: ChangePersonalPasswordComponent;
  let fixture: ComponentFixture<ChangePersonalPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePersonalPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePersonalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
