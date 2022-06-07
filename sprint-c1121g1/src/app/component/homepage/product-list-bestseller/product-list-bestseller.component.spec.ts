import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListBestsellerComponent } from './product-list-bestseller.component';

describe('ProductListBestsellerComponent', () => {
  let component: ProductListBestsellerComponent;
  let fixture: ComponentFixture<ProductListBestsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListBestsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListBestsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
