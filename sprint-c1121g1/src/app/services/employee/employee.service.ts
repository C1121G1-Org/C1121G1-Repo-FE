import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeDto} from '../../dto/employeeDto';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/employee'
};
const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  saveEmployee(employeeDto): Observable<EmployeeDto> {
      return this.http.post<EmployeeDto>(API_URL + '/create', employeeDto);
    }

  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(API_URL + '/position/list');
  }
}
