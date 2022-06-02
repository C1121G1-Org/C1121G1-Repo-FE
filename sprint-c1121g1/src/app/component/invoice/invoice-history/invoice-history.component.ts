import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../../../services/invoice/invoice.service';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {
  invoiceList: InvoiceDto[] = [];
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

}
