import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Supplier} from '../../../models/supplier';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-list-supplier-modal',
  templateUrl: './list-supplier-modal.component.html',
  styleUrls: ['./list-supplier-modal.component.css']
})

/*
  Created by khoaVC
  Role: Admin, Storekeeper
  Time: 10:00 03/06/2022
  Component: ListSupplierModalComponent
  Function: all function
*/

export class ListSupplierModalComponent implements OnInit, OnChanges {
  chosenItem: Supplier = {};
  flag: boolean;
  errorFlag: boolean;
  errorMessage: string;
  suppliers: Supplier[];
  @Output() itemOutput = new EventEmitter();
  @Output() flagCreate = new EventEmitter();
  @ViewChild('btnClose') btnClose;
  @ViewChild('btnNoneSelectedModal') btnNoneSelectedModal;
  searchForm: FormGroup;
  pageNumber = 0;
  pageSize: number;
  first = true;
  totalPages: any;
  last: boolean;
  @Input() item: any;

  constructor(private supplierService: SupplierService, private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  ngOnInit(): void {
    this.errorFlag = false;
    this.flag = false;
    this.getAllSuppliers('', '', '', '');
    this.searchForm = this.fb.group({
      field: ['supplier'],
      value: ['', Validators.pattern('^[ @.0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$')]
    });
  }

  getItem(item: any) {
    if (item.id == this.chosenItem.id || this.chosenItem.id == undefined || !this.flag) {
      this.flag = !this.flag;
    }
    if (this.flag) {
      this.chosenItem = item;
    } else {
      this.chosenItem = {};
    }
  }

  closeModal() {
    this.btnClose.nativeElement.click();
  }

  checkSelected() {
    if (!this.flag && this.chosenItem.id == undefined) {
      this.btnNoneSelectedModal.nativeElement.click();
    }
  }

  sendItem() {
    this.itemOutput.emit(this.chosenItem);
    // if (this.chosenItem.id != undefined) {
    if (this.flag) {
      this.closeModal();
      this.ngOnInit();
      this.flagCreate.emit(true);
    }
  }

  getAllSuppliers(supplier: string, address: string, phone: string, email: string) {
    this.supplierService.list(this.pageNumber, supplier, address, phone, email).subscribe(
      (response) => {
        this.first = response.first;
        this.totalPages = response.totalPages;
        this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);  // [1, 2, 3, 4, 5]
        this.pageSize = response.pageable.pageSize;
        this.last = (response.pageable.offset + response.pageable.pageSize) >= response.totalElements;
        this.suppliers = response.content;
      },
      (error) => {
        this.errorFlag = true;
      });
  }

  search() {
    if (this.searchForm.invalid) {
      this.errorFlag = true;
    } else {
      switch (this.searchForm.value.field) {
        case 'supplier':
          this.getAllSuppliers(this.searchForm.value.value.trim(), '', '', '');
          break;
        case 'address':
          this.getAllSuppliers('', this.searchForm.value.value.trim(), '', '');
          break;
        case 'phone':
          this.getAllSuppliers('', '', this.searchForm.value.value.trim(), '');
          break;
        case 'email':
          this.getAllSuppliers('', '', '', this.searchForm.value.value.trim());
          break;
      }
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
