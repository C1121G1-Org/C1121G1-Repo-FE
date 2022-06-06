import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {Router} from '@angular/router';
import {Customer} from '../../../models/customer';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[];
  public idClick: number;
  public activeProjectIndex: number;
  totalPage = 0;
  page = 0;
  nameCustomer = '';
  phoneNumber = '';
  message = '';
  totalElement = 0;
  collection: any[] = this.customerList;
  searchForm: FormGroup;


  constructor(private customerService: CustomerService,
              private router: Router) {

    this.searchForm = new FormGroup({
      typeSearch: new FormControl(''),
      inputSearch: new FormControl(''),
    });
  }


  ngOnInit(): void {
    this.customerService.getAllCustomer(this.nameCustomer, this.phoneNumber, this.page).subscribe(
      (data: any) => {
        this.customerList = data.content;
        this.page = data.number;
        this.totalPage = data.totalPages;
      });
  }

  /*
  Created By hoangDH,
  Time: 12:38 PM 2022-06-06
  Function: take id and flag from html
  */
  public activeProject(index: number, id: number): void {
    this.activeProjectIndex = index;
    this.idClick = id;
  }

  /*
  Created By hoangDH,
  Time: 12:38 PM 2022-06-06
  Function: next page back end in html
  */
  next() {
    if (this.page < this.totalPage - 1) {
      this.customerService.getAllCustomer(this.nameCustomer, this.phoneNumber, this.page + 1).subscribe(
        (data: any) => {
          this.customerList = data.content;
          this.page = data.number;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  /*
    Created By hoangDH,
    Time: 12:38 PM 2022-06-06
    Function: previous page back end in html
    */

  previous() {
    if (this.page > 0) {
      this.customerService.getAllCustomer(this.nameCustomer, this.phoneNumber, this.page - 1).subscribe(
        (data: any) => {
          this.customerList = data.content;
          this.page = data.number;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  /*
    Created By hoangDH,
    Time: 12:38 PM 2022-06-06
    Function: search page
    */
  search() {
    const input = this.searchForm.get('inputSearch').value;
    const type = this.searchForm.get('typeSearch').value;
    /*const pattern = /^([^0-9]*)$/;
    const pattern2 = /^(090\d{7})|(091\d{7})|(\(\+84\)90\d{7})|(\(\+84\)91\d{7})$/;*/
    if (type === 'nameCustomer' && input !== '') {
      this.customerService.getAllCustomer(this.nameCustomer = input, this.phoneNumber, this.page).subscribe(
        (data: any) => {
          this.customerList = data.content;
          this.page = data.number;
          this.totalPage = data.totalPages;
        }, err => {
          console.log(err);
        }
      );
    } else if (type === 'phoneNumber' && input !== '') {
      this.customerService.getAllCustomer(this.nameCustomer, this.phoneNumber = input, this.page).subscribe(
        (data: any) => {
          this.totalElement = data.totalElements;
          if (this.totalElement === 0) {
            this.message = 'Không tìm thấy kết quả trả về';
            alert('Không tìm thấy kết quả trả về');
          } else {
          this.customerList = data.content;
          this.page = data.number;
          this.totalPage = data.totalPages; }
        }, err => {
          console.log(err);
        }
      );
    }
  }
}
