import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Supplier} from '../../../models/supplier';

@Component({
  selector: 'app-storage-list-suppliers-modal',
  templateUrl: './storage-list-suppliers-modal.component.html',
  styleUrls: ['./storage-list-suppliers-modal.component.css']
})
export class StorageListSuppliersModalComponent implements OnInit {

  list: any = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}, {id: 4, name: 'd'}, {id: 5, name: 'e'}, {id: 6, name: 'f'}];
  chosenItem: any;
  flag = false;
  errorMessage: string;
  suppliers: Supplier[];
  @Output() itemOutput = new EventEmitter();
  @Output() flagCreate = new EventEmitter();

  @ViewChild('btnClose') btnClose;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getItem(item: any) {
    this.chosenItem = item;
    this.flag = !this.flag;
  }

  sendItem() {
    if (this.flag) {
      this.itemOutput.emit(this.chosenItem);
      this.btnClose.nativeElement.click();
      this.flagCreate.emit(true);
    }
  }

  getAllSuppliers(){
    this.supplierService.list().subscribe(
      (response) => {
        this.suppliers = response.content;
        },
      (error) => {alert('FAILED'); });
  }
}
