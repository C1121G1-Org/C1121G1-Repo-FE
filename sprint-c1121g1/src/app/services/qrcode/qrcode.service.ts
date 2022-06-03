import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  URL = "http://localhost:8080/api/qrcode";

  constructor(private http: HttpClient) {
  }

  encode(product: Product): Observable<any> {
    return this.http.post(`${this.URL}/encode`, product, {responseType: "blob"})
  }

  decode(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/decode`, formData);
  }

  check(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/check`, formData);
  }

}
