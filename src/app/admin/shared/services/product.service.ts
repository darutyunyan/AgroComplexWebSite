import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductService {
    public isShowLoader: BehaviorSubject<boolean>;

    constructor(private http: HttpClient) {
        this.isShowLoader = new BehaviorSubject<boolean>(false);
    }

    getLoaderStatus(): Observable<boolean> {
        return this.isShowLoader.asObservable();
    }

    runLoader(newValue): void {
        this.isShowLoader.next(newValue);
    }

    initAddProduct() {
        return this.http.get(`/product/initAddProduct`);
    }

    addProduct(request) {
        return this.http.post(`/product/addProduct`, request);
    }

    getAllProducts() {
        return this.http.get(`/product/getAllProducts`);
    }

    removeProduct(request) {
        return this.http.post(`/product/removeProduct`, request);
    }

    addColumnType(request) {
        return this.http.post(`/product/addColumnType`, request);
    }

    removeColumnType(request) {
        return this.http.post(`/product/removeColumnType`, request);
    }

    getColumnTypes() {
        return this.http.get(`/product/getColumnTypes`);
    }

    addProductName(request) {
        return this.http.post(`/product/addProductName`, request);
    }

    removeProductName(request) {
        return this.http.post(`/product/removeProductName`, request);
    }

    getProductNames() {
        return this.http.get(`/product/getproductNames`);
    }

    addProductType(request) {
        return this.http.post(`/product/addProductType`, request);
    }

    removeProductType(request) {
        return this.http.post(`/product/removeProductType`, request);
    }

    getProductTypes() {
        return this.http.get(`/product/getproductTypes`);
    }
}
