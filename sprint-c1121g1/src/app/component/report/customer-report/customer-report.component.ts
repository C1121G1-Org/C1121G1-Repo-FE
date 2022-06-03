
import {Component, OnInit} from '@angular/core';
import {ReportCustomerDto} from '../../../dto/report-customer-dto';
import {ReportAndHistoryService} from '../../../services/report/report-and-history.service';


@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {

  customerReports: ReportCustomerDto[] = [];

  pageNumber = 0;
  totalPages = 0;

  chooseFilter: number;

  chooseGenderSearch = false;
  chooseAgeSearch = false;

  genderSearch: boolean;
  ageSearch: number;
  checkReportCustomers = true;

  constructor(private reportService: ReportAndHistoryService) {
  }


  ngOnInit(): void {
    this.filterAllCustomerReport();
  }


  filterAllCustomerReport() {
    this.reportService.filterAllCustomerReport(this.pageNumber).subscribe(customerReports => {
      console.log(this.checkReportCustomers);

      this.checkReportCustomers = true;

      this.customerReports = customerReports.content;
      this.totalPages = customerReports.totalPages;
      this.pageNumber = customerReports.pageabel.pageNumber;
    });
  }

  filterByGender() {
    this.reportService.filterByGender(this.pageNumber, this.genderSearch)
      .subscribe(customerReports => {
        if (customerReports == null) {
          this.checkReportCustomers = false;
        } else {
          this.checkReportCustomers = true;

          this.customerReports = customerReports.content;
          this.totalPages = customerReports.totalPages;
          this.pageNumber = customerReports.pageabel.pageNumber;
        }
      });
  }

  filterByAge() {
    this.reportService.filterByAge(this.pageNumber, this.ageSearch)
      .subscribe(customerReports => {
        console.log(customerReports);
        if (customerReports == null) {
          this.checkReportCustomers = false;
        } else {
          this.checkReportCustomers = true;

          this.customerReports = customerReports.content;
          this.totalPages = customerReports.totalPages;
          this.pageNumber = customerReports.pageabel.pageNumber;
        }
        console.log(this.checkReportCustomers);
      });
  }

  filterByGenderAndAge() {
    this.reportService.filterByGenderAndAge(this.pageNumber, this.genderSearch, this.ageSearch)
      .subscribe(customerReports => {
        if (customerReports == null) {
          this.checkReportCustomers = false;
        } else {
          this.checkReportCustomers = true;

          this.customerReports = customerReports.content;
          this.totalPages = customerReports.totalPages;
          this.pageNumber = customerReports.pageabel.pageNumber;
        }
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
    this.chooseFilter = Number(element.value);
  }

  chooseSearchGender() {
    this.chooseGenderSearch = !this.chooseGenderSearch;
  }

  chooseSearchAge() {
    this.chooseAgeSearch = !this.chooseAgeSearch;
  }

  searchGender(target: any) {
    this.genderSearch = target.value;
  }

  searchAge(target: any) {
    this.ageSearch = target.value;
  }

  filter() {
    if (this.chooseFilter === 1) {
      this.filterAllCustomerReport();
    } else if (this.chooseFilter === 2) {
      if (this.chooseGenderSearch === true) {
        if (this.chooseAgeSearch === true) {
          this.filterByGenderAndAge();
        } else {
          this.filterByGender();
        }
      } else {
        if (this.chooseAgeSearch === true) {
          this.filterByAge();
        } else {
          console.log('Chưa chọn lọc cách search');
        }
      }
    }
  }


}

