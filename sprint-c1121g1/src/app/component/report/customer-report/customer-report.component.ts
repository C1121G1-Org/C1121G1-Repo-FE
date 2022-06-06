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

  chooseFilter = 1;

  chooseGenderSearch = false;
  chooseAgeSearch = false;

  genderSearch: boolean;
  ageSearch: string;
  checkReportCustomers = true;

  checkGenderValue = true;
  checkAgeValue = true;
  checkSelectiveValue = true;

  constructor(private reportService: ReportAndHistoryService) {
  }


  ngOnInit(): void {
    this.filterAllCustomerReport();
  }


  filterAllCustomerReport() {

    this.reportService.filterAllCustomerReport(this.pageNumber).subscribe(customerReports => {

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
    this.reportService.filterByAge(this.pageNumber, parseInt(this.ageSearch))
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

  filterByGenderAndAge() {
    this.reportService.filterByGenderAndAge(this.pageNumber, this.genderSearch, parseInt(this.ageSearch))
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
    if (this.chooseFilter === 1) {
      this.reportService.filterAllCustomerReport(this.pageNumber - 1).subscribe(customerReports => {
        this.customerReports = customerReports.content;
        if (this.pageNumber - 1 <= 0) {
          this.pageNumber = 0;
        } else {
          this.pageNumber = this.pageNumber - 1;
        }
      });
    } else if (this.chooseFilter === 2) {
      if (this.chooseGenderSearch === true) {
        if (this.chooseAgeSearch === true) {
          this.reportService.filterByGenderAndAge(
            this.pageNumber - 1, this.genderSearch, parseInt(this.ageSearch))
            .subscribe(customerReports => {
              this.customerReports = customerReports.content;
              if (this.pageNumber - 1 <= 0) {
                this.pageNumber = 0;
              } else {
                this.pageNumber = this.pageNumber - 1;
              }
            });
        } else {
          this.reportService.filterByGender(
            this.pageNumber - 1, this.genderSearch)
            .subscribe(customerReports => {
              this.customerReports = customerReports.content;
              if (this.pageNumber - 1 <= 0) {
                this.pageNumber = 0;
              } else {
                this.pageNumber = this.pageNumber - 1;
              }
            });
        }
      } else {
        if (this.chooseAgeSearch === true) {
          this.reportService.filterByAge(
            this.pageNumber - 1, parseInt(this.ageSearch))
            .subscribe(customerReports => {
              this.customerReports = customerReports.content;
              if (this.pageNumber - 1 <= 0) {
                this.pageNumber = 0;
              } else {
                this.pageNumber = this.pageNumber - 1;
              }
            });
        } else {
          console.log('Chưa chọn lọc cách search');
        }
      }
    }
  }

  nextPage() {

    if (this.chooseFilter === 1) {
      this.reportService.filterAllCustomerReport(this.pageNumber + 1).subscribe(customerReports => {
        this.customerReports = customerReports.content;
        if (this.pageNumber + 1 >= this.totalPages) {
          this.pageNumber = this.totalPages - 1;
        } else {
          this.pageNumber = this.pageNumber + 1;
        }
      });
    } else if (this.chooseFilter === 2) {
      if (this.chooseGenderSearch === true) {
        if (this.chooseAgeSearch === true) {
          this.reportService.filterByGenderAndAge(
            this.pageNumber + 1, this.genderSearch, parseInt(this.ageSearch))
            .subscribe(customerReports => {
              this.customerReports = customerReports.content;
              if (this.pageNumber + 1 >= this.totalPages) {
                this.pageNumber = this.totalPages - 1;
              } else {
                this.pageNumber = this.pageNumber + 1;
              }
            });
        } else {
          this.reportService.filterByGender(
            this.pageNumber + 1, this.genderSearch)
            .subscribe(customerReports => {
              this.customerReports = customerReports.content;
              if (this.pageNumber + 1 >= this.totalPages) {
                this.pageNumber = this.totalPages - 1;
              } else {
                this.pageNumber = this.pageNumber + 1;
              }
            });
        }
      } else {
        if (this.chooseAgeSearch === true) {
          this.reportService.filterByAge(
            this.pageNumber + 1, parseInt(this.ageSearch))
            .subscribe(customerReports => {
              this.customerReports = customerReports.content;
              if (this.pageNumber + 1 >= this.totalPages) {
                this.pageNumber = this.totalPages - 1;
              } else {
                this.pageNumber = this.pageNumber + 1;
              }
            });
        } else {
          console.log('Chưa chọn lọc cách search');
        }
      }
    }
  }

  filterVariable(element: HTMLInputElement) {
    this.chooseFilter = Number(element.value);
  }

  chooseSearchGender() {
    this.checkGenderValue = true;
    this.chooseGenderSearch = !this.chooseGenderSearch;
  }

  chooseSearchAge() {
    this.checkAgeValue = true;
    this.chooseAgeSearch = !this.chooseAgeSearch;
  }

  searchGender(target: any) {
    this.genderSearch = target.value;
  }

  searchAge(target: any) {
    this.ageSearch = target.value;

  }

  filter(errorBtn: HTMLButtonElement) {
    this.pageNumber = 0;
    if (this.chooseFilter == 1) {
      this.filterAllCustomerReport();
    } else if (this.chooseFilter == 2) {
      this.checkSelectiveValue = true;
      if (this.chooseGenderSearch == true) {
        if (this.chooseAgeSearch == true) {
          if (this.genderSearch == undefined) {
            this.checkGenderValue = false;
            errorBtn.click();
            if (this.ageSearch == undefined || this.ageSearch == '') {
              this.checkAgeValue = false;
              errorBtn.click();
            } else {
              this.checkAgeValue = true;
            }
          } else {
            if (this.ageSearch == undefined || this.ageSearch == '') {
              this.checkAgeValue = false;
              errorBtn.click();
            } else {
              this.checkAgeValue = true;
            }
            this.checkGenderValue = true;
            this.filterByGenderAndAge();
          }
        } else {
          if (this.genderSearch == undefined) {
            this.checkGenderValue = false;
            errorBtn.click();
          } else {
            this.checkGenderValue = true;
            this.filterByGender();
          }
        }
      } else {
        if (this.chooseAgeSearch == true) {
          if (this.ageSearch == undefined || this.ageSearch == '') {
            this.checkAgeValue = false;
            errorBtn.click();
          } else {
            this.checkAgeValue = true;
            this.filterByAge();
          }
        } else {
          this.checkSelectiveValue = false;
          errorBtn.click();
        }
      }
    }
  }

}
