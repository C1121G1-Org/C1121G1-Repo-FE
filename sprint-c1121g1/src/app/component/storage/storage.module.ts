import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageCreateComponent } from './storage-create/storage-create.component';
import { QrcodeCreateComponent } from './qrcode-create/qrcode-create.component';
import { StorageUpdateComponent } from './storage-update/storage-update.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageListSuppliersModalComponent } from './storage-list-suppliers-modal/storage-list-suppliers-modal.component';


@NgModule({
  declarations: [StorageCreateComponent, QrcodeCreateComponent, StorageUpdateComponent, StorageListComponent, StorageListSuppliersModalComponent],
  imports: [
    CommonModule,
    StorageRoutingModule
  ]
})
export class StorageModule { }
