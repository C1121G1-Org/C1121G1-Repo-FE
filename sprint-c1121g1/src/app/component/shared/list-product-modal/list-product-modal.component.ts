import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product/product.service';

@Component({
  selector: 'app-list-product-modal',
  templateUrl: './list-product-modal.component.html',
  styleUrls: ['./list-product-modal.component.css']
})

/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Component: ListProductModalComponent
  Function: all function
*/

export class ListProductModalComponent implements OnInit {

  chosenItem: any;
  flag: boolean;
  errorFlag: boolean;
  errorMessage: string;
  products: Product[];
  @Output() itemOutput = new EventEmitter();
  @Output() flagCreate = new EventEmitter();
  @ViewChild('btnProductClose') btnProductClose;
  // searchForm: FormGroup;
  pageNumber = 0;
  first = true;
  totalPages: any;
  last: boolean;

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.errorFlag = false;
    this.flag = false;

    // this.getAllProducts('', '', '', '');
    // this.searchForm = this.fb.group({
    //   field: ['supplier'],
    //   value: ['']
    // });
  }

  getItem(item: any) {
    this.chosenItem = item;
    this.flag = !this.flag;
  }

  sendItem() {
    if (this.flag) {
      this.itemOutput.emit(this.chosenItem);
      this.btnProductClose.nativeElement.click();
      this.flagCreate.emit(true);
    }
  }


  // getAllProducts(){
  //   this.productService.list().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.products = response; },
  //     (error) => {}
  //   );
  // }

  // getAllProducts(supplier: string, address: string, phone: string, email: string){
  //   console.log('in getAll');
  //   this.productService.list().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.first = response.first;
  //       this.totalPages = response.totalPages;
  //       this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);  // [1, 2, 3, 4, 5]
  //       this.last = (response.pageable.offset + response.pageable.pageSize) >= response.totalElements;
  //       this.products = response.content;
  //     },
  //     (error) => { this.errorFlag = true; });
  // }

  search() {
    // console.log(this.searchForm.value);
    // switch (this.searchForm.value.field) {
    //   case 'supplier':
    //     console.log(this.searchForm.value);
    //     this.getAllSuppliers(this.searchForm.value.value, '', '', '');
    //     break;
    //   case 'address':
    //     console.log(this.searchForm.value);
    //     this.getAllSuppliers('', this.searchForm.value.value, '', '');
    //     break;
    //   case 'phone':
    //     console.log(this.searchForm.value);
    //     this.getAllSuppliers('', '', this.searchForm.value.value, '');
    //     break;
    //   case 'email':
    //     console.log(this.searchForm.value);
    //     this.getAllSuppliers('', '', '', this.searchForm.value.value);
    //     break;
    // }
  }

  refresh() {
    // this.searchForm.reset();
    // this.ngOnInit();
  }

  next() {
    // console.log('next');
    // this.pageNumber++;
    // this.search();
  }

  previous() {
    // this.pageNumber--;
    // this.search();
  }

  getItemPaging(index: any) {
    // this.pageNumber = index - 1;
    // this.search();
  }

}
