import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/product/listTest`);
  }

  getAllProductPage(pageable, name, price, searchByQuantity): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/product/list?page=${pageable}&keyName=${name}&keyPrice=${price}&keyQuantity=${searchByQuantity}`);
  }
}
