import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Supplier} from '../../../models/supplier';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-supplier-modal',
  templateUrl: './list-supplier-modal.component.html',
  styleUrls: ['./list-supplier-modal.component.css']
})

/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Component: ListSupplierModalComponent
  Function: all function
*/

export class ListSupplierModalComponent implements OnInit {
  chosenItem: any;
  flag: boolean;
  errorFlag: boolean;
  errorMessage: string;
  suppliers: Supplier[];
  @Output() itemOutput = new EventEmitter();
  @Output() flagCreate = new EventEmitter();
  @ViewChild('btnClose') btnClose;
  searchForm: FormGroup;
  pageNumber = 0;
  first = true;
  totalPages: any;
  last: boolean;

  constructor(private supplierService: SupplierService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.errorFlag = false;
    this.flag = false;
    this.getAllSuppliers('', '', '', '');
    this.searchForm = this.fb.group({
      field: ['supplier'],
      value: ['']
    });
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

  getAllSuppliers(supplier: string, address: string, phone: string, email: string){
    this.supplierService.list(this.pageNumber, supplier, address, phone, email).subscribe(
      (response) => {
        console.log(response);
        this.first = response.first;
        this.totalPages = response.totalPages;
        this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);  // [1, 2, 3, 4, 5]
        this.last = (response.pageable.offset + response.pageable.pageSize) >= response.totalElements;
        this.suppliers = response.content;
      },
      (error) => { this.errorFlag = true; });
  }

  search() {
    switch (this.searchForm.value.field) {
      case 'supplier':
        this.getAllSuppliers(this.searchForm.value.value, '', '', '');
        break;
      case 'address':
        this.getAllSuppliers('', this.searchForm.value.value, '', '');
        break;
      case 'phone':
        this.getAllSuppliers('', '', this.searchForm.value.value, '');
        break;
      case 'email':
        this.getAllSuppliers('', '', '', this.searchForm.value.value);
        break;
    }
  }

  refresh() {
    this.searchForm.reset();
    this.ngOnInit();
  }

  next() {
    this.pageNumber++;
    this.search();
  }

  previous() {
    this.pageNumber--;
    this.search();
  }

  getItemPaging(index: any) {
    this.pageNumber = index - 1;
    this.search();
  }
}
