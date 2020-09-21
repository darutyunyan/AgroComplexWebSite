import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) { }

    initAddProduct() {
        return this.http.get(`${this.baseUrl}/product/initAddProduct`);
    }

    addProduct(request) {
        return this.http.post(`${this.baseUrl}/product/addProduct`, request);
    }

    getAllProducts() {
        return this.http.get(`${this.baseUrl}/product/getAllProducts`);
    }

    removeProduct(request) {
        return this.http.post(`${this.baseUrl}/product/removeProduct`, request);
    }

    addColumnType(request) {
        return this.http.post(`${this.baseUrl}/product/addColumnType`, request);
    }

    removeColumnType(request) {
        return this.http.post(`${this.baseUrl}/product/removeColumnType`, request);
    }

    getColumnTypes() {
        return this.http.get(`${this.baseUrl}/product/getColumnTypes`);
    }

    addProductName(request) {
        return this.http.post(`${this.baseUrl}/product/addProductName`, request);
    }

    removeProductName(request) {
        return this.http.post(`${this.baseUrl}/product/removeProductName`, request);
    }

    getProductNames() {
        return this.http.get(`${this.baseUrl}/product/getproductNames`);
    }

    addProductType(request) {
        return this.http.post(`${this.baseUrl}/product/addProductType`, request);
    }

    removeProductType(request) {
        return this.http.post(`${this.baseUrl}/product/removeProductType`, request);
    }

    getProductTypes() {
        return this.http.get(`${this.baseUrl}/product/getproductTypes`);
    }
}
