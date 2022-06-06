import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-customer-modal',
  templateUrl: './list-customer-modal.component.html',
  styleUrls: ['./list-customer-modal.component.css']
})
export class ListCustomerModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
        // @ts-ignore
        this.totalPages = Array(this.totalPages).fill(1).map((x, i) => i + 1);
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

  getAllCustomerPage(index: any) {
    this.indexCurrent = index;
    this.pageNumber = index - 1;
    this.getModalCustomer(this.pageNumber, this.searchByName, this.searchByPhone);
  }

  search(value: string) {
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

  close() {
    this.currentCustomer = null;
    this.searchByPhone = '';
    this.searchByName = '';
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#successModal');
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
>>>>>>> e4837ffe24d5547f69d85a6bc4e0fac7f0ba52d8
}
