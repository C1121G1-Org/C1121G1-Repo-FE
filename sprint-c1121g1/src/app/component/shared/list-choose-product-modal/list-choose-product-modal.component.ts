import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../../models/IProduct';
import {ICustomer} from '../../../models/ICustomer';
import {ProductService} from '../../../services/product/product.service';

@Component({
  selector: 'app-list-choose-product-modal',
  templateUrl: './list-choose-product-modal.component.html',
  styleUrls: ['./list-choose-product-modal.component.css']
})
export class ListChooseProductModalComponent implements OnInit {
  productList: IProduct[] = [];
  pageNumber: number;
  totalPages = [];
  searchByName = '';
  searchByPrice = '';
  flag = false;
  last: boolean;
  first: boolean;
  checkSearch = '';
  selectedProduct: IProduct;
  currentProduct: IProduct;

  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice);
  }

  getModalProduct(pageNumber, searchByName, searchByPrice) {
    this.productService.getAllProduct(pageNumber, searchByName, searchByPrice).subscribe((res: any) => {
      this.productList = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.totalPages;
      this.first = res.first;
      // @ts-ignore
      this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
      console.log(this.totalPages);
      this.last = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
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

  chooseProduct() {
    // this.router.navigate(['/storage', this.currentProduct]);
  }

  getAllProductPage(index: any) {
    this.pageNumber = index - 1;
    this.getModalProduct(this.pageNumber, this.searchByName, this.searchByPrice);
  }
}
