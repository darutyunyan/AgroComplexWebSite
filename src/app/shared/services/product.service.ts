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

    getColumnTypes() {
        return this.http.get(`${environment.agroComplexWebServiceUrl}/product/getColumnTypes`);
    }

    addProdcutName(request) {
        return this.http.post(`${environment.agroComplexWebServiceUrl}/product/addProductName`, request);
    }

    getproductNames() {
        return this.http.get(`${environment.agroComplexWebServiceUrl}/product/getproductNames`);
    }
    
}
