import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplierModalComponent } from './list-supplier-modal.component';

describe('ListSupplierModalComponent', () => {
  let component: ListSupplierModalComponent;
  let fixture: ComponentFixture<ListSupplierModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSupplierModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupplierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
