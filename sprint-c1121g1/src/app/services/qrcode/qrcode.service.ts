import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from "../../models/iProduct";

/*
    Created by HauPV
    Time: 09:00 03/06/2022
    Function: qr-code scan
*/
@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  URL = 'http://localhost:8080/api/qrcode';

  constructor(private http: HttpClient) {
  }

  encode(product: IProduct): Observable<any> {
    return this.http.post(`${this.URL}/encode`, product, {responseType: 'blob'});
  }

  decode(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/decode`, formData);
  }

  check(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/check`, formData);
  }

}
