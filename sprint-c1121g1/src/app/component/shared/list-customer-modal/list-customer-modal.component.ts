import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ICustomer} from '../../../models/ICustomer';
import {CustomerService} from '../../../services/customer/customer.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-customer-modal',
  templateUrl: './list-customer-modal.component.html',
  styleUrls: ['./list-customer-modal.component.css']
})
/*
  Created by tamHT
  Time: 13:37 03/06/2022
  Method: pageProduct()
*/
export class ListCustomerModalComponent implements OnInit, OnChanges {
  @Output() itemOutput = new EventEmitter();
  @Input() item: boolean;
  pageNumber: number;
  customerList: ICustomer[] = [];
  totalPages: number;
  searchByName = '';
  searchByPhone = '';
  selectedCustomer: ICustomer;
  currentCustomer: ICustomer;
  flag = false;
  last: boolean;
  first: boolean;
  checkSearch = 'name';
  message: boolean;
  searchValue = '';
  indexCurrent: number;
  selectedIndex: number;
  formSearch: FormGroup;
  pageSize: number;


  constructor(private customerService: CustomerService, private router: Router) {
    this.formSearch = new FormGroup({
      keySearch: new FormControl('', [Validators.pattern('^[0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\\s]*$')])
    });
  }

  ngOnInit(): void {
    this.message = false;
    this.getModalCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
  }

  chooseCustomer(exit) {
    this.itemOutput.emit(this.currentCustomer);
    this.currentCustomer = null;
    exit.click();
  }

  getModalCustomer(pageNumber, searchByName, searchByPhone) {
    this.message = false;
    this.customerService.getAllCustomer(pageNumber, searchByName, searchByPhone).subscribe((res: any) => {
      if (res.content != null) {
        this.customerList = res.content;
        this.pageNumber = res.pageable.pageNumber;
        this.totalPages = res.totalPages;
        this.first = res.first;
        this.last = (res.pageable.offset + res.pageable.pageSize) >= res.totalElements;
        this.pageSize = res.pageable.pageSize;
        // @ts-ignore
        // this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
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
    return this.currentCustomer.id === this.selectedCustomer.id ? true : false;
  }

  // getAllCustomerPage(index: any) {
  //   this.indexCurrent = index;
  //   this.pageNumber = index - 1;
  //   this.getModalCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
  // }

  search(value: string) {
    value = value.trim();
    if (!this.formSearch.valid) {
      this.searchByPhone = 'sadsad8sa0d89as';
      this.searchByName = '34543fddcsd';
      this.getModalCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
    } else {
      this.currentCustomer = null;
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

  }

  close() {
    this.currentCustomer = null;
    this.searchByPhone = '';
    this.searchByName = '';
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#customerModals');
    container.appendChild(button);
    button.click();

  }

  getAll() {
    this.currentCustomer = null;
    this.searchValue = '';
    this.searchByPhone = '';
    this.searchByName = '';
    this.ngOnInit();
  }

  checkColorIndex(index: number) {
    this.selectedIndex = index;
    if (!this.indexCurrent) {
      return false;
    }
    return this.indexCurrent === this.selectedIndex ? true : false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchValue = '';
    this.searchByPhone = '';
    this.searchByName = '';
    this.ngOnInit();
  }

}
