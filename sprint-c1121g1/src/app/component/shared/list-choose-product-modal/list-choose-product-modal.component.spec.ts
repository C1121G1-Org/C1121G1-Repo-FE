import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChooseProductModalComponent } from './list-choose-product-modal.component';

describe('ListChooseProductModalComponent', () => {
  let component: ListChooseProductModalComponent;
  let fixture: ComponentFixture<ListChooseProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChooseProductModalComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChooseProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
