import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

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
