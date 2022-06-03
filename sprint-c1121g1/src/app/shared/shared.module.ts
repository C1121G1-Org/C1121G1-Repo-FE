import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [QrCodeComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
  ],
  exports:[
    QrCodeComponent
  ]
})
export class SharedModule { }
