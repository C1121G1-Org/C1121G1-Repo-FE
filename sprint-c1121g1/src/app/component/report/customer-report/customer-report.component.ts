import {Component, OnInit} from '@angular/core';
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
  ageSearch: number;
  chooseGenderSearch = false;
  // chooseAgeSearch = false;

  constructor(private reportService: ReportAndHistoryService) {
  }

  ngOnInit(): void {
    this.filterAllCustomerReport();
  }

  filterAllCustomerReport() {
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
      if (this.pageNumber - 1 <= 0) {
        this.pageNumber = 0;
      } else {
        this.pageNumber = this.pageNumber - 1;
      }
    });
  }

  nextPage() {
    this.reportService.filterAllCustomerReport(this.pageNumber + 1).subscribe(customerReports => {
      this.customerReports = customerReports.content;
      if (this.pageNumber + 1 >= this.totalPages) {
        this.pageNumber = this.totalPages - 1;
      } else {
        this.pageNumber = this.pageNumber + 1;
      }
    });
  }

  filterVariable(element: HTMLInputElement) {
    console.log(element);
    console.log(element.value);
  }

  chooseSearchGender() {
    console.log(this.chooseGenderSearch);
    this.chooseGenderSearch = !this.chooseGenderSearch;
    // console.log(this.genderSearch);
  }

  // chooseAgeSearch() {
  //   console.log(this.chooseAgeSearch);
  //   this.chooseAgeSearch = !this.chooseAgeSearch;
  // }
}
