import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClientProductService {

  constructor(private http: HttpClient) { }

  initHomePage(): Observable<any> {
    return this.http.get(`https://localhost:44332/product/initHomePage`);
  }

  getProductNamesByType(request): Observable<any> {
    return this.http.post('https://localhost:44332/product/getProductNamesByType', request);
  }

  getProductById(request): Observable<any> {
    return this.http.post('https://localhost:44332/product/getProductById', request);
  }

  getFirstProductByType(request): Observable<any> {
    return this.http.post('https://localhost:44332/product/getFirstProductByType', request);
  }
}
