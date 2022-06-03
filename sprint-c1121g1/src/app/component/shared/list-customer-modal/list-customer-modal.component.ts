import {Component, OnInit} from '@angular/core';
import {ICustomer} from '../../../models/ICustomer';
import {CustomerService} from '../../../services/customer/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-customer-modal',
  templateUrl: './list-customer-modal.component.html',
  styleUrls: ['./list-customer-modal.component.css']
})
export class ListCustomerModalComponent implements OnInit {
  pageNumber: number;
  customerList: ICustomer[] = [];
  totalPages = [];
  searchByName = '';
  searchByPhone = '';
  selectedCustomer: ICustomer;
  currentCustomer: ICustomer;
  flag = false;
  last: boolean;
  first: boolean;
  checkSearch = 'name';
  message: boolean;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.message = false;
    this.getModalCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
  }

  getModalCustomer(pageNumber, searchByName, searchByPhone) {
    this.message = false;
    this.customerService.getAllCustomer(pageNumber, searchByName, searchByPhone).subscribe((res: any) => {
      if (res.content != null) {
        this.customerList = res.content;
        this.pageNumber = res.pageable.pageNumber;
        this.totalPages = res.totalPages;
        this.first = res.first;
        // @ts-ignore
        this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
        console.log(this.totalPages);
        this.last = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
      }
    }, error => {
      this.message = true;
    });
  }

  nextPage() {
    this.getModalCustomer(this.pageNumber + 1, this.searchByName, this.searchByPhone);
  }

  previousPage() {
    this.getModalCustomer(this.pageNumber - 1, this.searchByName, this.searchByPhone);
  }

  getCustomer(customer: ICustomer): void {
    this.currentCustomer = customer;
  }

  isSelected(customer: ICustomer): boolean {
    this.selectedCustomer = customer;
    if (!this.currentCustomer) {
      return false;
    }
    return this.currentCustomer.customerName === this.selectedCustomer.customerName ? true : false;
  }

  getAllCustomerPage(index: any) {
    this.pageNumber = index - 1;
    this.getModalCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
  }

  search(value: string) {
    this.pageNumber = 0;
    if (this.checkSearch === 'phone') {
      this.searchByPhone = value;
      this.searchByName = '';
      this.getModalCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
    } else {
      this.searchByName = value;
      this.searchByPhone = '';
      this.getModalCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
    }
  }

  chooseCustomer(exit) {
    alert(this.currentCustomer.id);
    this.router.navigate(['/chooseCustomer'])
    this.currentCustomer = null;
    exit.click();
  }
}
