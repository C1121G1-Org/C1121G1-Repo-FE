import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class ListChooseProductModalComponent implements OnInit {
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

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.searchValue = '';
    this.searchByPrice = '';
    this.searchByName = '';
    this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice);
  }

  getModalProduct(pageNumber, searchByName, searchByPrice) {
    this.message = false;
    this.productService.getAllProductPage(pageNumber, searchByName, searchByPrice).subscribe((res: any) => {
      this.productList = res.content;
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
    this.getModalProduct(this.pageNumber + 1, this.searchByName, this.searchByPrice);
  }

  previousPage() {
    this.getModalProduct(this.pageNumber - 1, this.searchByName, this.searchByPrice);
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
    return this.currentProduct.name === this.selectedProduct.name ? true : false;
  }

  chooseProduct(close) {
    this.itemOutput.emit(this.currentProduct);
    console.log(this.currentProduct);
    this.currentProduct = null;
    close.click();
  }

  getAllProductPage(index: any) {
    this.indexCurrent = index;
    this.pageNumber = index - 1;
    this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice);
  }

  search(value: any) {
    this.currentProduct = null;
    this.pageNumber = 0;
    if (this.checkSearch === 'price') {
      this.searchByPrice = value;
      this.searchByName = '';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice);
    } else {
      this.searchByName = value;
      this.searchByPrice = '';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice);
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

  getAll(a) {
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
