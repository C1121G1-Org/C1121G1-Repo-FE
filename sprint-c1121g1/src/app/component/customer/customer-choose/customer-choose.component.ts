import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {ICustomer} from '../../../models/ICustomer';

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

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getAllProduct(this.pageNumber, this.searchByName, this.searchByPhone).subscribe((res: ICustomer[]) => {
      this.customerList = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.pageable.totalPages;
    });
  }

  previousPage() {
    this.customerService.getAllProduct(this.pageNumber - 1, this.searchByName, this.searchByPhone).subscribe((res: ICustomer[]) => {
      this.customerList = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.totalPages;
    });

  }

  nextPage() {
    this.customerService.getAllProduct(this.pageNumber - 1, this.searchByName, this.searchByPhone).subscribe((res: any) => {
      this.customerList = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.totalPages = res.pageable.totalPages;
    });

  }
}
