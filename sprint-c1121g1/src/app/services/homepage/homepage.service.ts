import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from "../../models/category";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  homepageApi = 'http://localhost:8080/api/invoiceDetail/';

  constructor(private http: HttpClient) {
  }

  getProductBestseller(): Observable<any> {
    return this.http.get<any>(this.homepageApi + "listProductBestseller");
  }

  getProductNewest(): Observable<any> {
    return this.http.get<any>(this.homepageApi + "listProductNewest");
  }

  getProductBestsellerByCategory(category: Category): Observable<any> {
    return this.http.get<any>(this.homepageApi + "listProductBestseller/" + category.id)
  }
}
