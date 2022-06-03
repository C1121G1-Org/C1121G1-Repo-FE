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
    console.log(element);
    console.log(element.value);
    this.chooseFilter = Number(element.value);
    console.log('chooseFilter' + this.chooseFilter);
  }

  chooseSearchGender() {
    // console.log(this.chooseGenderSearch);
    this.chooseGenderSearch = !this.chooseGenderSearch;
    console.log('choose gender search' + this.chooseGenderSearch);
  }

  chooseSearchAge() {
    this.chooseAgeSearch = !this.chooseAgeSearch;
    console.log('choose age search' + this.chooseAgeSearch);
  }

  searchGender(target: any) {
    this.genderSearch = target.value;
    console.log('search gender' + this.genderSearch);
  }

  searchAge(target: any) {
    this.ageSearch = target.value;
    console.log('search age' + this.ageSearch);
  }

  filter() {
    console.log('dasddd' + this.checkReportCustomers);
    console.log('before search');

    console.log('choose filter' + this.chooseFilter);
    console.log('choose gender search' + this.chooseGenderSearch);
    console.log('choose age search' + this.chooseAgeSearch);
    console.log('search gender' + this.genderSearch);
    console.log('search age' + this.ageSearch);

    console.log('ahihi' + this.chooseFilter);
    if (this.chooseFilter === 1) {
      console.log('age: ' + this.ageSearch);
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

