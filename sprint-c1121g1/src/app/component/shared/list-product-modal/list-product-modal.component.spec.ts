import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductModalComponent } from './list-product-modal.component';

describe('ListProductModalComponent', () => {
  let component: ListProductModalComponent;
  let fixture: ComponentFixture<ListProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
