import { Component, OnInit } from '@angular/core';
import {ReportCustomerDto} from '../../../dto/report-customer-dto';
import {ReportAndHistoryService} from '../../../services/report/report-and-history.service';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})

/*
    Created by TuanNQ
    Time: 18:00 31/05/2022
    Function: Show all list report customer
*/
export class CustomerReportComponent implements OnInit {

  customerReports: ReportCustomerDto[] = [];

  pageNumber = 0;
  totalPages = 0;

  constructor(private reportService: ReportAndHistoryService) { }

  ngOnInit(): void {
    this.filterAllCustomerReport();
  }

  filterAllCustomerReport() {
    console.log('haha');
    this.reportService.filterAllCustomerReport(this.pageNumber).subscribe(customerReports => {
      console.log(customerReports);

      this.customerReports = customerReports.content;
      this.totalPages = customerReports.totalPages;
      this.pageNumber = customerReports.pageabel.pageNumber;
    });
  }

  previousPage() {
    this.reportService.filterAllCustomerReport(this.pageNumber - 1).subscribe(customerReports => {
      this.customerReports = customerReports.content;
      this.pageNumber = this.pageNumber - 1;
    });
  }

  nextPage() {
    this.reportService.filterAllCustomerReport(this.pageNumber + 1).subscribe(customerReports => {
      this.customerReports = customerR
      eports.content;
      this.pageNumber = this.pageNumber + 1;
    });
  }
}
