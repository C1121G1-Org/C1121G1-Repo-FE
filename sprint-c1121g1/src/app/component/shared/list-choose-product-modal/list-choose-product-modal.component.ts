import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IProduct} from '../../../models/IProduct';
import {ProductService} from '../../../services/product/product.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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
  @Input() item: boolean;
  productList: IProduct[] = [];
  pageNumber: number;
  totalPages = [];
  searchByName = '';
  searchByPrice = '';
  flag = false;
  last: boolean;
  first: boolean;
  checkSearch = 'name';
  currentProduct: IProduct;
  message: boolean;
  searchValue = '';
  selectedIndex: number;
  indexCurrent: number;
  searchByQuantity = '';
  formSearch: FormGroup;
  pageSize: number;
  sort = 'priceDesc';
  checkSort = false;
  activeProjectIndex: number;
  flagClick = false;
  checkSortName = false;
  checkSortQuantity = false;
  checkSortCpu = false;
  checkSortMemory = false;




  constructor(private productService: ProductService, private router: Router) {
    this.formSearch = new FormGroup({
      keySearch: new FormControl('', [Validators.pattern('^[0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\\s]*$')]),
      keySearchPhone: new FormControl('', [Validators.pattern('\\d*')])
    })
    ;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchValue = '';
    this.searchByPrice = '';
    this.searchByName = '';
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
  }

  getModalProduct(pageNumber, searchByName, searchByPrice, searchByQuantity, sort) {
    this.message = false;
    this.productService.getAllProductPage(pageNumber, searchByName, searchByPrice, searchByQuantity, sort).subscribe((res: any) => {
      this.productList = res.content;
      console.log(this.productList);
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.totalPages;
      this.first = res.first;
      this.last = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
      this.pageSize = res.pageable.pageSize;
      // // @ts-ignore
      // this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
    }, error => {
      this.message = true;
    });
  }

  nextPage() {
    // this.sort = 'priceDesc';
    this.getModalProduct(this.pageNumber + 1, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
  }

  previousPage() {
    // this.sort = 'priceDesc';
    this.getModalProduct(this.pageNumber - 1, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
  }


  isSelectedProduct(index: number, product: IProduct): void {
    if (this.activeProjectIndex != index) {
      this.flagClick = true;
      this.activeProjectIndex = index;
      this.currentProduct = product;
    } else {
      this.flagClick = !this.flagClick;
      this.currentProduct = null;
    }
    if (this.flagClick) {
      this.currentProduct = product;
    } else {
      this.currentProduct = null;
    }


  }

  chooseProduct(close) {
    if (this.currentProduct) {
      this.itemOutput.emit(this.currentProduct);
      this.currentProduct = null;
      close.click();
    } else {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#productModals');
      container.appendChild(button);
      button.click();
    }

  }

  // getAllProductPage(index: any) {
  //   this.indexCurrent = index;
  //   this.pageNumber = index - 1;
  //   this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity);
  // }


  search(value: any) {
    this.sort = 'priceDesc';
    value = value.trim();
    if (!this.formSearch.valid) {
      this.searchByPrice = 'sadsad8sa0d89as';
      this.searchByName = '34543fddcsd';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    } else {
      this.currentProduct = null;
      this.pageNumber = 0;
      if (this.checkSearch === 'price') {
        if (this.checkSearch) {
          this.searchByPrice = value;
        }
        this.searchByName = '';
        this.searchByQuantity = '';
        this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
      } else {
        this.searchByName = value;
        this.searchByPrice = '';
        this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
      }
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
    button.setAttribute('data-target', '#productModals');
    container.appendChild(button);
    // this.check = true;
    button.click();
  }


  checkColorIndex(index: number) {
    this.selectedIndex = index;
    if (!this.indexCurrent) {
      return false;
    }
    return this.indexCurrent === this.selectedIndex ? true : false;
  }

  changeSort() {
    this.checkSort = !this.checkSort;
    if (this.checkSort == true) {
      this.sort = 'priceAsc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    } else {
      this.sort = 'priceDesc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    }
  }

  changeSortName() {
    this.checkSortName = !this.checkSortName;
    if (this.checkSortName == true) {
      this.sort = 'nameAsc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    } else {
      this.sort = 'nameDesc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    }
  }

  changeSortQuantity() {
    this.checkSortQuantity = !this.checkSortQuantity;
    if (this.checkSortQuantity == true) {
      this.sort = 'quantityAsc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    } else {
      this.sort = 'quantityDesc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    }
  }

  repeat() {
    this.currentProduct = null;
    this.searchValue = '';
    this.searchByPrice = '';
    this.searchByName = '';
    this.sort = 'priceDesc';
    this.ngOnInit();
  }

  changeSortCpu() {
    this.checkSortCpu = !this.checkSortCpu;
    if (this.checkSortCpu == true) {
      this.sort = 'cpuAsc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    } else {
      this.sort = 'cpuDesc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    }
  }

  changeSortMemory() {
    this.checkSortMemory = !this.checkSortMemory;
    if (this.checkSortMemory == true) {
      this.sort = 'memoryAsc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    } else {
      this.sort = 'memoryDesc';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity, this.sort);
    }
  }
}
