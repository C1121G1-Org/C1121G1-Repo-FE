import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../../services/invoice/invoice.service';
import {InvoiceDto} from '../../../dto/invoiceDto';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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
    keyword: new FormControl('', Validators.pattern('^[a-zA-Z0-9]$'))
  });

  keyword = '';
  sort = '';
  page = 0;
  totalPages = 0;

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
    if (this.formSearch.get('keyword').valid) {
      this.invoiceService.getAll(this.keyword, this.sort, this.page).subscribe(data => {
          this.page = data.number;
          this.totalPages = data.totalPages;
          this.invoiceList = data.content;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.invoiceList = [];
    }

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
}
