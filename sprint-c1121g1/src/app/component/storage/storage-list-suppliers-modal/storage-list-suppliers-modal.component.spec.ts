import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageListSuppliersModalComponent } from './storage-list-suppliers-modal.component';

describe('StorageListSuppliersModalComponent', () => {
  let component: StorageListSuppliersModalComponent;
  let fixture: ComponentFixture<StorageListSuppliersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageListSuppliersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageListSuppliersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
