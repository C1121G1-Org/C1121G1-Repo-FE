
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeDto} from '../../dto/employee/employeeDto';
import {Positions} from '../../models/positions';

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

  getAllPosition(): Observable<Positions[]> {
    return this.http.get<Positions[]>(API_URL + '/position/list');
  }
  findById(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${API_URL}/${id}`);
  }
    updateEmployee(id: number, employeeDto: EmployeeDto): Observable<EmployeeDto> {
    return this.http.patch<EmployeeDto>(`${API_URL}/update/${id}`, employeeDto);
  }
}
