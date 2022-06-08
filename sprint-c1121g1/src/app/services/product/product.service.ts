// @ts-ignore

import {Injectable} from '@angular/core';
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

  /*
        Created by tuanPA
        Time:
        Function:
  */

  productApi = 'http://localhost:8080/api/product';

  /*
      Created by TuanPA
      Date: 9:08 3/6/2022
      Function: createProduct
  */
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.productApi + '/create', product);
  }

<<<<<<< HEAD

<<<<<<< HEAD
=======
=======
>>>>>>> origin/manager-report
>>>>>>> 401adbb69d9baa1c395096cb280c0a6a4c1bc8ba
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: find by id
*/

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.productApi + '/' + id);
  }

<<<<<<< HEAD

=======
>>>>>>> origin/manager-report
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: edit product
*/

  updateProduct(id: number, value: any): Observable<any> {
    return this.http.patch<any>(this.productApi + '/' + 'update/' + id, value);
  }

<<<<<<< HEAD
=======


  listAll(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/list`);
  }

<<<<<<< HEAD
  /*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Method: list()
*/
  list(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/listAll`);
  }

=======
>>>>>>> origin/manager-report
>>>>>>> 401adbb69d9baa1c395096cb280c0a6a4c1bc8ba
  /*
   Created by tamHT
   Time: 13:37 03/06/2022
   Method: pageProduct()
 */
  getAllProductPage(pageable, name, price, searchByQuantity): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/list?page=${pageable}&keyName=${name}&keyPrice=${price}&keyQuantity=${searchByQuantity}`);
<<<<<<< HEAD

=======
>>>>>>> 401adbb69d9baa1c395096cb280c0a6a4c1bc8ba
  }

}
