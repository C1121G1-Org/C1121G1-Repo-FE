import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StorageCreateComponent} from './storage-create/storage-create.component';
import {AuthGuard} from '../security/auth.guard';


const routes: Routes = [
  {path: 'storage/create', component: StorageCreateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_STOREKEEPER']
    }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }
