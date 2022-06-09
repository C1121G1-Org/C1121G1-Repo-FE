import { Component, OnInit } from '@angular/core';

import {EmployeeService} from '../../../services/employee/employee.service';
import {EmployeeInterface} from '../../../dto/employee/employee-interface';
import {Router} from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeInterface[] = [];
  name: any = '';
  nameDelete: string ;
  message: boolean;
  page: any;
  totalPages = 0;
  activeProjectIndex: number;
  idClick = 0;
  pageSize: 0;
  firsts: boolean;
  last: boolean;
  flag = false;

  constructor(private employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: get all employee
   */

  getAll() {
    this.message = false;
    this.employeeService.getAll('', this.page).subscribe(data => {
      // @ts-ignore
      this.employees = data.content;
      this.page = data.number;
      this.totalPages = data.totalPages;
      this.pageSize  = data.pageable.pageSize;
      this.firsts = data.first;
      this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
    }, error => {
      this.message = true;
    });
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: search name employee
   */

  search(name: string) {
    this.page = 0;
    name = name.trim();
    this.employeeService.getAll(name, this.page).subscribe(data => {
      this.employees = data.content;
      this.totalPages = data.totalPages;
      this.page = data.number;
      if (this.employees.length < 1) {
        this.message = false;
      }
    }, err => {
      this.message = true;
    });
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: pagination previous
   */

  previous() {
    if (this.page > 0) {
      this.employeeService.getAll(this.name, this.page - 1).subscribe(
        data => {
          this.employees = data.content;
          this.page = data.number;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  /*
     Created by HuyNH
     Time: 19:00 4/06/2022
     Function: pagination next
  */
  next() {
    if (this.page < this.totalPages - 1) {
      this.employeeService.getAll(this.name, this.page + 1).subscribe(
        data => {
          this.employees = data.content;
          this.page = data.number;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: click event line-by-line
   */

  public activeProject(index: number, id: number, nameEmployee: string): void {
    if (this.activeProjectIndex !== index) {
      this.flag = true;
    } else {
      this.flag = !this.flag;
    }
    this.activeProjectIndex = index;
    if (this.flag === true) {
      this.nameDelete = nameEmployee;
      this.idClick = id;
    } else {
      this.idClick = 0;
    }
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: delete employee
   */

  delete(closeModal: HTMLButtonElement) {
    this.employeeService.deleteEmployee(this.idClick).subscribe(() => {
      closeModal.click();
      this.ngOnInit();
    }, e => {
      console.log(e);
    });

  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: choose delete or alert error if not choose id
   */

  clickDelete(deleteButton: HTMLButtonElement, errorButton: HTMLButtonElement) {
    if (this.idClick){
      deleteButton.click();
    }else {
      errorButton.click();
    }
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: alert error if not choose id edit
   */

  clickEdit(errorButton: HTMLButtonElement) {
    if (this.idClick){
      this.router.navigate(['/employee/edit/', this.idClick]);
    }else {
      errorButton.click();
    }
  }
}
