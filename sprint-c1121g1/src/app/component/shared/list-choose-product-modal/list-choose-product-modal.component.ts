import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IProduct} from '../../../models/IProduct';
import {ProductService} from '../../../services/product/product.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-list-choose-product-modal',
  templateUrl: './list-choose-product-modal.component.html',
  styleUrls: ['./list-choose-product-modal.component.css']
})
/*
  Created by tamHT
  Time: 13:37 03/06/2022
  Method: pageProduct()
*/
export class ListChooseProductModalComponent implements OnInit, OnChanges {
  @Output() itemOutput = new EventEmitter();
  productList: IProduct[] = [];
  pageNumber: number;
  totalPages = [];
  searchByName = '';
  searchByPrice = '';
  flag = false;
  last: boolean;
  first: boolean;
  checkSearch = 'name';
  selectedProduct: IProduct;
  currentProduct: IProduct;
  message: boolean;
  searchValue = '';
  selectedIndex: number;
  indexCurrent: number;
  searchByQuantity = '';

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchValue = '';
    this.searchByPrice = '';
    this.searchByName = '';
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity);
  }

  getModalProduct(pageNumber, searchByName, searchByPrice, searchByQuantity) {
    this.message = false;
    this.productService.getAllProductPage(pageNumber, searchByName, searchByPrice, searchByQuantity).subscribe((res: any) => {
      this.productList = res.content;
      console.log(this.productList);
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.totalPages;
      this.first = res.first;
      this.last = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
      // @ts-ignore
      this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
    }, error => {
      this.message = true;
    });
  }

  nextPage() {
    this.getModalProduct(this.pageNumber + 1, this.searchByName, this.searchByPrice, this.searchByQuantity);
  }

  previousPage() {
    this.getModalProduct(this.pageNumber - 1, this.searchByName, this.searchByPrice, this.searchByQuantity);
  }

  getProduct(product: IProduct): void {
    this.currentProduct = product;
  }

  isSelectedProduct(product: IProduct): boolean {
    this.selectedProduct = product;
    // tslint:disable-next-line:triple-equals
    if (!this.currentProduct) {
      return false;
    }
    return this.currentProduct.id === this.selectedProduct.id ? true : false;
  }

  chooseProduct(close) {
    this.itemOutput.emit(this.currentProduct);
    this.currentProduct = null;
    close.click();
  }

  getAllProductPage(index: any) {
    this.indexCurrent = index;
    this.pageNumber = index - 1;
    this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice , this.searchByQuantity);
  }

  search(value: any) {
    this.currentProduct = null;
    this.pageNumber = 0;
    if (this.checkSearch === 'price') {
      this.searchByPrice = value;
      this.searchByName = '';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice , this.searchByQuantity);
    } else {
      this.searchByName = value;
      this.searchByPrice = '';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice , this.searchByQuantity);
    }
  }

  close() {
    this.currentProduct = null;
    this.searchByName = '';
    this.searchByPrice = '';
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#successModal');
    container.appendChild(button);
    // this.check = true;
    button.click();
  }

  getAll() {
    this.currentProduct = null;
    this.searchValue = '';
    this.searchByPrice = '';
    this.searchByName = '';
    this.ngOnInit();
  }

  checkColorIndex(index: number) {
    this.selectedIndex = index;
    if (!this.indexCurrent) {
      return false;
    }
    return this.indexCurrent === this.selectedIndex ? true : false;
  }
}
