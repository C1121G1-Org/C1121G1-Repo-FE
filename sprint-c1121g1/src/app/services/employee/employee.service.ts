import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../../models/employee/employee";
import {EmployeeInterface} from "../../dto/employee/employee-interface";
import {Positions} from "../../models/employee/positions";

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/employee'
};
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getAll(name: string, page: number): Observable<any> {
    return this.http.get<any>(API_URL + `/list?page=${page}&keyName=${name}`);
  }

  saveEmployee(employeeDto): Observable<EmployeeInterface> {
    return this.http.post<EmployeeInterface>(API_URL + '/create', employeeDto);
  }

  getAllPosition(): Observable<Positions[]> {
    return this.http.get<Positions[]>(API_URL + '/position/list');
  }

  findById(id: number): Observable<EmployeeInterface> {
    return this.http.get<EmployeeInterface>(`${API_URL}/${id}`);
  }

  updateEmployee(id: number, employeeDto: EmployeeInterface): Observable<EmployeeInterface> {
    return this.http.patch<EmployeeInterface>(`${API_URL}/update/${id}`, employeeDto);
  }

  deleteEmployee(id: number): Observable<EmployeeInterface> {
    // @ts-ignore
    return this.http.patch<EmployeeInterface>(API_URL + `/delete/` + id);
  }
}
