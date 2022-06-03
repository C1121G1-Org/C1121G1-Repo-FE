import { Component, OnInit } from '@angular/core';
import {Employee} from "../../../models/employee/employee";
import {EmployeeService} from "../../../services/employee/employee.service";
import {Positions} from "../../../models/employee/positions";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  // positions: Positions[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAll();
    // this.getAllPosition();
  }

  private getAll() {
    this.employeeService.getAll().subscribe(employees => {
      this.employees = employees;
    });
  }

  // private getAllPosition() {
  //   this.employeeService.getAllPosition().subscribe(positions => {
  //     // @ts-ignore
  //     this.positions = positions;
  //   })
  // }
}
