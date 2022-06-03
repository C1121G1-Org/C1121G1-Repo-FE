import { Injectable } from '@angular/core';
import {Product} from "../../models/product";
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
}
