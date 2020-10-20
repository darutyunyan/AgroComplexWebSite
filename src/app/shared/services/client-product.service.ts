import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClientProductService {

  constructor(private http: HttpClient) { }

  public initHomePage(): Observable<any> {
    return this.http.get(`https://localhost:44332/product/initHomePage`);
  }

  public getProductNamesByType(request): Observable<any> {
    return this.http.post('https://localhost:44332/product/getProductNamesByType', request);
  }

  public getProductById(request): Observable<any> {
    return this.http.post('https://localhost:44332/product/getProductById', request);
  }

  public getFirstProductByType(request): Observable<any> {
    return this.http.post('https://localhost:44332/product/getFirstProductByType', request);
  }
}
