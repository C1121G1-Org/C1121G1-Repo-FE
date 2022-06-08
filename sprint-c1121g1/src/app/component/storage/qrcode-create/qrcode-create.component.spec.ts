import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeCreateComponent } from './qrcode-create.component';

describe('QrcodeCreateComponent', () => {
  let component: QrcodeCreateComponent;
  let fixture: ComponentFixture<QrcodeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
