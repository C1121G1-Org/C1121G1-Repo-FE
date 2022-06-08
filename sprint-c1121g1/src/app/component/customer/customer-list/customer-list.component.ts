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
  idClick = 0;
  public activeProjectIndex: number;
  totalPage = 0;
  page = 0;
  nameCustomer = '';
  phoneNumber = '';
  message = false;
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
    this.customerService.getAllCustomer1(this.nameCustomer='', this.phoneNumber='', this.page).subscribe(
      (data: any) => {
        this.customerList = data.content;
        this.page = data.number;
        this.totalPage = data.totalPages;
      }, err => {
        console.log(err);
      });
    this.message = false;
  }

  /*
  Created By hoangDH,
  Time: 12:38 PM 2022-06-06
  Role: admin, business
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
      this.customerService.getAllCustomer1(this.nameCustomer, this.phoneNumber, this.page + 1).subscribe(
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
      this.customerService.getAllCustomer1(this.nameCustomer, this.phoneNumber, this.page - 1).subscribe(
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

    if (type === 'nameCustomer' && input.trim() !== '') {
      this.customerService.getAllCustomer1(this.nameCustomer = input.trim(), this.phoneNumber='', this.page).subscribe(
        (data: any) => {
          this.message = false;
          this.customerList = data.content;
          this.page = data.number;
          this.totalPage = data.totalPages;
        }, err => {
          this.message = true;
          this.customerList = null;
          this.page = 0;
          this.totalPage = 0;
          console.log(err);
        }
      );
    } else if (type === 'phoneNumber' && input.trim() !== '') {
      this.customerService.getAllCustomer1(this.nameCustomer='', this.phoneNumber = input.trim(), this.page).subscribe(
        (data: any) => {
          this.message = false;
          this.customerList = data.content;
          this.page = data.number;
          this.totalPage = data.totalPages;
        }, err => {
          this.message = true;
          this.customerList = null;
          this.page = 0;
          this.totalPage = 0;
          console.log(err);
        }
      );
    } else if (input.trim() == '') {
      this.customerService.getAllCustomer1(this.nameCustomer='', this.phoneNumber='', this.page).subscribe(
        (data: any) => {
          this.message = false;
          this.customerList = data.content;
          this.page = data.number;
          this.totalPage = data.totalPages;
          console.log(this.customerList);
        }, err => {
          this.message = true;
          console.log(err);
        });
    }
  }

  clearAll() {
    this.searchForm.reset();
    this.nameCustomer = '';
    this.phoneNumber = '';
  }

  toEditForm(sucessButton: HTMLButtonElement) {
    if (this.idClick == 0) {
      sucessButton.click();
    }
    else{
      this.router.navigate( ['/customer/edit/',this.idClick]);
    }
  }
}
