import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  URL = "http://localhost:8080/api/qrcode";

  constructor(private http: HttpClient) {
  }

  decode(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/decode`, formData);
  }

  check(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/check`, formData);
  }

}
