import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {Router} from '@angular/router';
import {Customer} from '../../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  constructor(private customerService: CustomerService,
              private router: Router) {
  }

  customerList: Customer[];
  private phone: string;
  private name: string;
  public idClick: number;
  public activeProjectIndex: number;
  totalPage = 0;
  page = 0;
  nameCustomer = '';
  phoneNumber = '';

  collection: any[] = this.customerList;

  ngOnInit(): void {
    this.customerService.getAllCustomer(name, this.phone).subscribe((data: any) => {
      this.customerList = data.content;
      this.page = data.number;
      this.totalPage = data.totalPage;
      console.log(this.customerList);
    });
  }

  public activeProject(index: number, id: number): void {
    this.activeProjectIndex = index;
    this.idClick = id;
  }


  next() {
    if (this.page < this.totalPage - 1) {
      this.customerService.getAllCustomer(this.nameCustomer, this.phoneNumber).subscribe(
        (data: any) => {
          this.customerList = data.content;
          this.page = data.number;
          this.totalPage = data.totalPage;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  previous() {
    if (this.page > 0) {
      this.customerService.getAllCustomer(this.nameCustomer, this.phoneNumber).subscribe(
        (data: any) => {
          this.customerList = data.content;
          this.page = data.number;
          this.totalPage = data.totalPage;
        }, err => {
          console.log(err);
        }
      );
    }
  }


  testClick() {
    alert(this.idClick);
  }
}
