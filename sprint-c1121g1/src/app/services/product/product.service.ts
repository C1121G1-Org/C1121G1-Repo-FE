
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Product} from '../../models/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // @ts-ignore
  private apiBaseUrl = environment.apiBaseUrl;
  private products: Product[];

  constructor(private http: HttpClient) {
  }

  productApi = 'http://localhost:8080/api/product';
  /*
      Created by TuanPA
      Date: 9:08 3/6/2022
      Function: This JwtFilter class extends OncePerRequestFilter class to override method doFilterInternal()
  */
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.productApi + '/create', product);
  }
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: This JwtFilter class extends OncePerRequestFilter class to override method doFilterInternal()
*/
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.productApi + '/' + id);
  }
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: This JwtFilter class extends OncePerRequestFilter class to override method doFilterInternal()
*/
  updateProduct(id: number, value: any): Observable<any> {
    return this.http.patch<any>(this.productApi + '/' + id, value);
  }
    list(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiBaseUrl}/api/product/list`);
  }
}
