import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  homepageApi = 'http://localhost:8080/api/invoiceDetail/listProductBestseller';

  constructor(private http: HttpClient) {
  }

  getProductBestseller(): Observable<any> {
    return this.http.get<any>(this.homepageApi);
  }
}
