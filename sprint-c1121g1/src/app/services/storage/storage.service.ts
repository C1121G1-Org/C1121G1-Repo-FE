import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageDto} from '../../dto/storageDto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiBaseUrl = environment.apiBaseUrl;
  private storages: Storage[];
  constructor(private http: HttpClient) { }

  create(data: StorageDto): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/api/storage/create`, data);
  }
}
