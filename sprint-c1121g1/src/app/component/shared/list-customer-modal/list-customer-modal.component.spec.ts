import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerModalComponent } from './list-customer-modal.component';

describe('ListCustomerModalComponent', () => {
  let component: ListCustomerModalComponent;
  let fixture: ComponentFixture<ListCustomerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCustomerModalComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
