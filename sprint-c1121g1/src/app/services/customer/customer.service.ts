import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient) {

  }
  getAllCustomer(pageable, name, phone): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/customer/list?page=${pageable}&keyName=${name}&keyPhone=${phone}`);
  }
}
