import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {InvoiceService} from '../../../services/invoice/invoice.service';
import {InvoiceDto} from '../../../dto/invoiceDto';


/*
Created by CongNV
Date : 04/06/2022
Function: Search,Pageable
*/
@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {

  invoiceList: InvoiceDto[] = [];

  productName = '';
  productQuantity = 0;

  formSearch = new FormGroup({
    keyword: new FormControl('', Validators.pattern('[0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\\\\s]*'))
  });

  keyword = '';
  sort = '';
  page = 0;
  totalPages = 0;
  message = '';

  checkDate = true;
  checkCustomer = true;
  checkTotalMoney = true;

  constructor(private invoiceService: InvoiceService) {
  }

  /*
  Created by CongNV
  Date : 04/06/2022
  Function: Search,Pageable
*/
  ngOnInit(): void {
    this.getSearch('', '', this.page);
  }

  getInvoiceDetailId(quantity: number, name: string) {
    this.productQuantity = quantity;
    this.productName = name;
  }

  getSearch(keyword: string, sort: string, page: number) {
    this.keyword = this.formSearch.get('keyword').value;
    this.invoiceService.getAll(this.keyword.trim(), this.sort, this.page).subscribe(data => {
        if (!this.formSearch.valid || data == null) {
          this.message = 'Không thể tìm thấy kết quả ';
          this.page = 0;
          this.totalPages = 0;
          this.invoiceList = null;
        }
        console.log(data);
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.invoiceList = data.content;
        console.log(data.content);

      },
      error => {
        console.log(error);
        this.message = 'Không thể tìm thấy kết quả ';
        this.page = 0;
        this.totalPages = 0;
        this.invoiceList = null;
      }
    );
  }

  previous() {
    if (this.page > 0) {
      this.page -= 1;
      this.getSearch(this.keyword, this.sort, this.page);
    }
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.page += 1;
      this.getSearch(this.keyword, this.sort, this.page);
    }
  }


  sortDate() {
    if (this.checkDate === true) {
      this.sort = 'sortDateAsc';
      this.invoiceService.getAll(this.keyword, this.sort, this.page).subscribe(data => {
        this.invoiceList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.checkDate = false;
      }, error => {
        console.log(error);
      });

    } else {
      this.sort = 'sortDateDesc';
      this.invoiceService.getAll(this.keyword, this.sort, this.page).subscribe(data => {
        this.invoiceList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.checkDate = true;
      }, error => {
        console.log(error);
      });

    }
  }

  sortCustomer() {
    if (this.checkCustomer === true) {
      this.sort = 'sortCustomerAsc';
      this.invoiceService.getAll(this.keyword, this.sort, this.page).subscribe(data => {
        this.invoiceList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.checkCustomer = false;
      }, error => {
        console.log(error);
      });

    } else {
      this.sort = 'sortCustomerDesc';
      this.invoiceService.getAll(this.keyword, this.sort, this.page).subscribe(data => {
        this.invoiceList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.checkCustomer = true;
      }, error => {
        console.log(error);
      });

    }
  }

  sortTotalMoney() {
    if (this.checkTotalMoney === true) {
      this.sort = 'sortTotalMoneyAsc';
      this.invoiceService.getAll(this.keyword, this.sort, this.page).subscribe(data => {
        this.invoiceList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.checkTotalMoney = false;
      }, error => {
        console.log(error);
      });

    } else {
      this.sort = 'sortTotalMoneyDesc';
      this.invoiceService.getAll(this.keyword, this.sort, this.page).subscribe(data => {
        this.invoiceList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.checkTotalMoney = true;
      }, error => {
        console.log(error);
      });

    }
  }

  changeKeyword() {
    this.keyword = this.formSearch.get('keyword').value;
  }
}
