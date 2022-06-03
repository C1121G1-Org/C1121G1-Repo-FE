import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../../models/employee/employee";

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

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL + '/list');
  }

  getAllPosition() : Observable<Position[]> {
    return this.http.get<Position[]>(API_URL + '/position/list');
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(API_URL + `/${id}`);
  }

  deleteEmployee(a: Employee): Observable<Employee> {
    return this.http.delete<Employee>(API_URL + `/${a.id}`);
  }
}
