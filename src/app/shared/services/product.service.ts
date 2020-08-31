import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    addColumnType(request) {
        return this.http.post(`${environment.agroComplexWebServiceUrl}/product/addColumnType`, request);
    }

    removeColumnType(request){
        return this.http.post(`${environment.agroComplexWebServiceUrl}/product/removeColumnType`, request);
    }

    getColumnTypes() {
        return this.http.get(`${environment.agroComplexWebServiceUrl}/product/getColumnTypes`);
    }

    addProductName(request) {
        return this.http.post(`${environment.agroComplexWebServiceUrl}/product/addProductName`, request);
    }
    
    removeProductName(request){
        return this.http.post(`${environment.agroComplexWebServiceUrl}/product/removeProductName`, request);
    }

    getProductNames() {
        return this.http.get(`${environment.agroComplexWebServiceUrl}/product/getproductNames`);
    }
    
    addProductType(request) {
        return this.http.post(`${environment.agroComplexWebServiceUrl}/product/addProductType`, request);
    }

    removeProductType(request){
        return this.http.post(`${environment.agroComplexWebServiceUrl}/product/removeProductType`, request);
    }

    getProductTypes() {
        return this.http.get(`${environment.agroComplexWebServiceUrl}/product/getproductTypes`);
    }
}
