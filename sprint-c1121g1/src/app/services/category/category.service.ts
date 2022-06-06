import {Injectable} from '@angular/core';
import {Category} from "../../models/category";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryApi = "http://localhost:8080/api/category/list";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.categoryApi);
  }
}