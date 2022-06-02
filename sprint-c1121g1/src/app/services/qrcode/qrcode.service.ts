import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
  decode(formData: FormData) {
      throw new Error("Method not implemented.");
  }
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

<<<<<<< HEAD
=======
  URL = "http://localhost:8080/api/qrcode";

  constructor(private http: HttpClient) {
  }

  decode(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/decode`, formData);
  }

  check(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/check`, formData);
  }

>>>>>>> 63d53c65a414e05e8cb9a227b1f3742e9ef9b616
}
