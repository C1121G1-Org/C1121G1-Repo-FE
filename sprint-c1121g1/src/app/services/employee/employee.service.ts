import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../models/employee';

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

  saveEmployee(employee): Observable<Employee> {
      return this.http.post<Employee>(API_URL + '/create', employee);
    }

  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(API_URL + '/position/list');
  }
}
