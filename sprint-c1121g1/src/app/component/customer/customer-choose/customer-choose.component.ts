import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {ICustomer} from '../../../models/ICustomer';
import {IProduct} from '../../../models/IProduct';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-choose',
  templateUrl: './customer-choose.component.html',
  styleUrls: ['./customer-choose.component.css']
})
export class CustomerChooseComponent implements OnInit {
  customerList: ICustomer[] = [];
  pageNumber: number;
  totalPages = 0;
  searchByName = '';
  searchByPhone = '';
  productList: IProduct[] = [];
  searchByPrice = '';
  searchByNameProduct = '';
  pageNumberProduct: number;
  totalPagesProduct = 0;
  selectedCustomer: ICustomer;
  currentCustomer: ICustomer;
  selectedProduct: IProduct;
  currentProduct: IProduct;
  a = 0;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.getModalCustomer();
    this.getModalProduct();
  }

  previousPage() {
    this.customerService.getAllCustomer(this.pageNumber - 1, this.searchByName, this.searchByPhone).subscribe((res: any) => {
      this.customerList = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.pageable.totalPages;
    });
  }

  nextPage() {
    this.customerService.getAllCustomer(this.pageNumber + 1, this.searchByName, this.searchByPhone).subscribe((res: any) => {
      this.customerList = res.content;
      console.log(this.customerList);
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.pageable.totalPages;
    });
  }

  getModalCustomer() {
    this.customerService.getAllCustomer(this.pageNumber, this.searchByName, this.searchByPhone).subscribe((res: any) => {
      this.customerList = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.pageable.totalPages;
    });
  }

  getModalProduct() {
    this.customerService.getAllProduct(this.pageNumberProduct, this.searchByNameProduct, this.searchByPrice).subscribe((res: any) => {
      this.productList = res.content;
      this.pageNumberProduct = res.pageable.pageNumber;
      this.totalPagesProduct = res.pageable.totalPages;
    });
  }

  nextPageProduct() {
    this.customerService.getAllProduct(this.pageNumberProduct - 1, this.searchByNameProduct, this.searchByPrice).subscribe((res: any) => {
      this.customerList = res.content;
      this.pageNumberProduct = res.pageable.pageNumber;
      this.totalPagesProduct = res.pageable.totalPages;
    });
  }

  previousPageProduct() {
    this.customerService.getAllProduct(this.pageNumberProduct - 1, this.searchByNameProduct, this.searchByPrice).subscribe((res: any) => {
      this.productList = res.content;
      this.pageNumberProduct = res.pageable.pageNumber;
      this.totalPagesProduct = res.pageable.totalPages;
    });
  }

  getCustomer(customer: ICustomer): void {
    this.currentCustomer = customer;
  }

  isSelected(customer: ICustomer): boolean {
    this.selectedCustomer = customer;
    // tslint:disable-next-line:triple-equals
    if (!this.currentCustomer) {
      return false;
    }
    return this.currentCustomer.customerName === this.selectedCustomer.customerName ? true : false;
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
    this.router.navigate(['/storage', this.currentProduct]);
  }
  chooseCustomer(){
  }
}
