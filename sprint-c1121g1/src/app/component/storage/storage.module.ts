import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';
import { StorageRoutingModule } from './storage-routing.module';
import { QrcodeCreateComponent } from './qrcode-create/qrcode-create.component';
import { StorageUpdateComponent } from './storage-update/storage-update.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StorageCreateComponent} from './storage-create/storage-create.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [StorageCreateComponent, QrcodeCreateComponent, StorageUpdateComponent, StorageListComponent],
  imports: [
    CommonModule,
    StorageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StorageModule { }
