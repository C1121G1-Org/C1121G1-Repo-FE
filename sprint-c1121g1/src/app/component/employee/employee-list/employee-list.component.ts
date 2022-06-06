import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../services/employee/employee.service";
import {EmployeeDto} from "../../../dto/employee/employee-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {Employee} from "../../../models/employee/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeDto[] = [];
  name: any = '';
  message: string ='';
  page: any;
  totalPages = 0;
  activeProjectIndex: number;
  idClick: number;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAll();
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: get all employee
   */

  private getAll() {
    this.employeeService.getAll('', this.page).subscribe(data => {
      if (this.employees == null) {
        this.message = 'Trang web đang bảo trì';
      } else {
        // @ts-ignore
        this.employees = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
      }
    });
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: search name employee
   */

  search(name: string) {
    this.employeeService.getAll(name, this.page).subscribe(data => {
      this.employees = data.content;
      this.totalPages = data.totalPages;
      this.page = data.number;
      if (this.employees.length < 1) {
        this.message = 'KHÔNG TÌM THẤY !';
      }
    }, err => {
      console.log(err);
    });
  }

  /*
      Created by HuyNH
      Time: 19:00 4/06/2022
      Function: pagination
   */

  previous() {
    if (this.page > 0) {
      this.employeeService.getAll(this.name, this.page - 1).subscribe(
        data => {
          this.employees = data.content;
          this.page = data.number;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.employeeService.getAll(this.name, this.page + 1).subscribe(
        data => {
          this.employees = data.content;
          this.page = data.number;
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

  public activeProject(index: number, id: number, nameEmployee : string) : void {
    this.activeProjectIndex = index;
    this.name = nameEmployee;
    this.idClick = id;
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
}
