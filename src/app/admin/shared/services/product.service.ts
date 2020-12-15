import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductService {
    public isShowLoader: BehaviorSubject<boolean>;

    constructor(private http: HttpClient) {
        this.isShowLoader = new BehaviorSubject<boolean>(false);
    }

    public getLoaderStatus(): Observable<boolean> {
        return this.isShowLoader.asObservable();
    }

    public runLoader(newValue): void {
        this.isShowLoader.next(newValue);
    }

    public initAddProduct(): Observable<object> {
        return this.http.get(`/product/initAddProduct`);
    }

    public addProduct(request): Observable<object> {
        return this.http.post(`/product/addProduct`, request);
    }

    public getAllProducts(): Observable<object> {
        return this.http.get(`/product/getAllProducts`);
    }

    public removeProduct(request): Observable<object> {
        return this.http.post(`/product/removeProduct`, request);
    }

    public addColumnType(request): Observable<object> {
        return this.http.post(`/product/addColumnType`, request);
    }

    public removeColumnType(request): Observable<object> {
        return this.http.post(`/product/removeColumnType`, request);
    }

    public getColumnTypes(): Observable<object> {
        return this.http.get(`/product/getColumnTypes`);
    }

    public addProductName(request): Observable<object> {
        return this.http.post(`/product/addProductName`, request);
    }

    public removeProductName(request): Observable<object> {
        return this.http.post(`/product/removeProductName`, request);
    }

    public getProductNames(): Observable<object> {
        return this.http.get(`/product/getproductNames`);
    }

    public addProductType(request): Observable<object> {
        return this.http.post(`/product/addProductType`, request);
    }

    public removeProductType(request): Observable<object> {
        return this.http.post(`/product/removeProductType`, request);
    }

    public getProductTypes(): Observable<any> {
        return this.http.get(`/product/getproductTypes`);
    }
}
