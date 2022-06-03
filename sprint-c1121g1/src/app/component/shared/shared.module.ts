import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {FormsModule} from '@angular/forms';
import {QrCodeComponent} from './qr-code/qr-code.component';


@NgModule({
  declarations: [QrCodeComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
  ],
  exports: [
    QrCodeComponent
  ]
})
export class SharedModule { }
