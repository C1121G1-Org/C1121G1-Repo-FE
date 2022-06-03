import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../../services/invoice/invoice.service';
import {InvoiceDto} from '../../../dto/invoiceDto';


@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {
  invoiceList: InvoiceDto[] = [];

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.invoiceService.getAll().subscribe(data => {
        // @ts-ignore
        this.invoiceList = data.content;
        console.log(this.invoiceList);
      },
      error => {
        console.log(error);
      }
    );
  }

}
