import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../../../services/employee/employee.service';
import {Positions} from '../../../models/positions';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  positiones: Positions[] = [];

  createEmployeeForm: FormGroup = new FormGroup({
    id: new FormControl(),
    employeeName: new FormControl(),
    dateOfBirth: new FormControl(),
    address: new FormControl(),
    idCard: new FormControl(),
    phoneNumber: new FormControl(),
    image: new FormControl(),
    positionDto: new FormControl(),
    accountDto: new FormGroup({
      userName: new FormControl(),
      encryptPassword: new FormControl(),
      email: new FormControl(),
    }),
  });

  constructor(private router: Router,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
   this.getPosition();
  }
  getPosition(){
    this.employeeService.getAllPosition().subscribe(
      next => {
        // @ts-ignore
        this.positiones = next.data;
      });
  }
  submit() {
    const employeeDto = this.createEmployeeForm.value;
    this.employeeService.saveEmployee(employeeDto).subscribe(() => {
      this.createEmployeeForm.reset();
      this.router.navigate(['list']);
      alert('Tạo thành công');
    }, e => {
      console.log(e);
    });
  }
}
