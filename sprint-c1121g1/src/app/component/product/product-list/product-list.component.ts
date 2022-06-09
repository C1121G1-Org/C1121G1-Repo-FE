import {Component, EventEmitter, OnInit, Output, SimpleChanges} from '@angular/core';
import {IProduct} from '../../../models/IProduct';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product/product.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: IProduct[] = [];
  pageNumber: number;
  totalPages: number;
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
  activeProjectIndex: number;
  idClick: number;
  getName: string;
  formSearch: FormGroup;
  pageSize: number
  flagClick = false;
  chosenItem: Product;

  constructor(private productService: ProductService, private router: Router) {
    this.formSearch = new FormGroup({
      searchKey: new FormControl('', Validators.pattern('^[0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\\s]*$'))
    })
  }


  ngOnInit(): void {
    this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity);
  }

  activeProject(index: number, product: Product): void {
    if (this.activeProjectIndex != index) {
      this.flagClick = true
      this.activeProjectIndex = index;
    } else {
      this.flagClick = !this.flagClick;
    }
    if (this.flagClick) {
      this.getName = product.name;
      this.idClick = product.id;
    } else {
      this.idClick = undefined;
    }
    console.log(this.chosenItem);
  }

  deleteProduct(sucessButton: HTMLButtonElement, cancel: HTMLButtonElement, errorButton: HTMLButtonElement) {

    this.productService.deleteProductById(this.idClick).subscribe(() => {
      cancel.click();
      sucessButton.click();
      this.ngOnInit();
    }, e => {
      cancel.click();
      errorButton.click();
    });
  }

  checkProduct(errorButton: HTMLButtonElement, deleteModal: HTMLButtonElement) {
    if (this.idClick) {
      deleteModal.click();
    } else {
      errorButton.click();
    }
  }

  checkProductEdit(errorButton: HTMLButtonElement) {
    if (this.idClick) {
      this.router.navigateByUrl("/product/edit/" + this.idClick)
    } else {
      errorButton.click();
    }
  }

  getModalProduct(pageNumber, searchByName, searchByPrice, searchByQuantity) {
    this.message = false;
    this.productService.getAllProductPage(pageNumber, searchByName, searchByPrice, searchByQuantity).subscribe((res: any) => {
      this.productList = res.content;
      console.log(res)
      console.log(this.productList);
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.totalPages;
      this.first = res.first;
      this.last = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
      this.pageSize = res.pageable.pageSize

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


  search(value: any) {
    value = value.trim();
    if (!this.formSearch.valid) {
      this.searchByName = '123abcxyz'
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity);
    }
    this.currentProduct = null;
    this.pageNumber = 0;
    if (this.checkSearch === 'price') {
      this.searchByPrice = value;
      this.searchByName = '';
      this.searchByQuantity = '';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity);
    } else if (this.checkSearch === 'quantity') {
      this.searchByPrice = '';
      this.searchByName = '';
      this.searchByQuantity = value;
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity);
    } else {
      this.searchByQuantity = '';
      this.searchByName = value;
      this.searchByPrice = '';
      this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice, this.searchByQuantity);
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

}
