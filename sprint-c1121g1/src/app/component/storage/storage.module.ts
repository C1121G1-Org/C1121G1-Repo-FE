import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';
import { StorageRoutingModule } from './storage-routing.module';
import { StorageCreateComponent } from './storage-create/storage-create.component';
import { StorageUpdateComponent } from './storage-update/storage-update.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [StorageCreateComponent, StorageUpdateComponent,
    StorageListComponent],
    imports: [
        CommonModule,
        StorageRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class StorageModule { }
