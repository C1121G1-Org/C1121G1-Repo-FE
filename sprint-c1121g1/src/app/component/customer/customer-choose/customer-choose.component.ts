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
  totalPages = [];
  searchByName = '';
  searchByPhone = '';
  productList: IProduct[] = [];
  searchByPrice = '';
  searchByNameProduct = '';
  pageNumberProduct: number;
  totalPagesProduct = [];
  selectedCustomer: ICustomer;
  currentCustomer: ICustomer;
  selectedProduct: IProduct;
  currentProduct: IProduct;
  a = 0;
  flag = false;
  lastCustomer: boolean;
  firstCustomer: boolean;
  checkSearch = '';

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
      this.firstCustomer = res.first;
      // @ts-ignore
      this.totalPages = Array(res.totalPages).fill(1).map((x, i) => i + 1);
      this.lastCustomer = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
    });
  }

  nextPage() {
    this.customerService.getAllCustomer(this.pageNumber + 1, this.searchByName, this.searchByPhone).subscribe((res: any) => {
      this.customerList = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.totalPages;
      this.firstCustomer = res.first;
      // @ts-ignore
      this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
      this.lastCustomer = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
    });
  }

  getModalCustomer() {
    this.customerService.getAllCustomer(this.pageNumber, this.searchByName, this.searchByPhone).subscribe((res: any) => {
      this.customerList = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.totalPages;
      this.firstCustomer = res.first;
      // @ts-ignore
      this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
      console.log(this.totalPages);
      this.lastCustomer = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
    });
  }

  getModalProduct() {
    this.customerService.getAllProduct(this.pageNumberProduct, this.searchByNameProduct, this.searchByPrice).subscribe((res: any) => {
      this.productList = res.content;
      this.pageNumberProduct = res.pageable.pageNumber;
      this.totalPagesProduct = res.totalPages;
    });
  }

  nextPageProduct() {
    this.customerService.getAllProduct(this.pageNumberProduct - 1, this.searchByNameProduct, this.searchByPrice).subscribe((res: any) => {
      this.customerList = res.content;
      this.pageNumberProduct = res.pageable.pageNumber;
      this.totalPagesProduct = res.totalPages;
    });
  }

  previousPageProduct() {
    this.customerService.getAllProduct(this.pageNumberProduct - 1, this.searchByNameProduct, this.searchByPrice).subscribe((res: any) => {
      this.productList = res.content;
      this.pageNumberProduct = res.pageable.pageNumber;
      this.totalPagesProduct = res.totalPages;
    });
  }

  getCustomer(customer: ICustomer): void {
    this.currentCustomer = customer;
    this.flag = !this.flag;
  }

  isSelected(customer: ICustomer): boolean {
    this.selectedCustomer = customer;
    if (!this.currentCustomer || !this.flag) {
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

  chooseCustomer() {
  }

  getAllCustomerPage(index: any) {
    this.pageNumber = index - 1;
    this.customerService.getAllCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
  }
  // search cho customer
  search(value: string) {
    console.log(value);
    if (this.checkSearch === '') {
      this.searchByName = value;
      this.searchByPhone = '';
      this.customerService.getAllCustomer(this.pageNumber, this.searchByName, this.searchByPhone).subscribe((res: any) => {
        console.log(res);
        this.customerList = res.content;
        this.pageNumber = res.pageable.pageNumber;
        this.totalPages = res.totalPages;
        this.firstCustomer = res.first;
        // @ts-ignore
        this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
        console.log(this.totalPages);
        this.lastCustomer = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
      });
    } else if (this.checkSearch === 'phone') {
      this.searchByPhone = value;
      this.searchByName = '';
      console.log(value);
      this.customerService.getAllCustomer(this.pageNumber, this.searchByName, this.searchByPhone).subscribe((res: any) => {
        console.log(res);
        this.customerList = res.content;
        this.pageNumber = res.pageable.pageNumber;
        this.totalPages = res.totalPages;
        this.firstCustomer = res.first;
        // @ts-ignore
        this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
        this.lastCustomer = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
      });
    } else {
      alert('3');
      this.searchByName = value;
      this.searchByPhone = '';
      this.customerService.getAllCustomer(this.pageNumber, this.searchByName, this.searchByPhone).subscribe((res: any) => {
        console.log(res);
        this.customerList = res.content;
        this.pageNumber = res.pageable.pageNumber;
        this.totalPages = res.totalPages;
        this.firstCustomer = res.first;
        // @ts-ignore
        this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
        this.lastCustomer = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
      });
    }
  }
//  search cho product

}
