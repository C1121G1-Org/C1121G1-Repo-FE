import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChooseComponent } from './customer-choose.component';

describe('CustomerChooseComponent', () => {
  let component: CustomerChooseComponent;
  let fixture: ComponentFixture<CustomerChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
