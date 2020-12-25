import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/admin/shared/services/product.service';
import {
    addProductError, addProductPending, addProductSuccess, getProductsError,
    getProductsPending, getProductsSuccess, removeProductError, removeProductPending,
    removeProductSuccess
} from '../../actions/admin/product.action';
import { IProductResponse } from '../../models/admins.model';
import { IResponseError } from '../../models/error';


@Injectable()
export class ProductEffects {
    public getProducts$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductsPending, removeProductSuccess),
        mergeMap(() => this.productService.getAllProducts()
            .pipe(
                map((products: IProductResponse) => {
                    return getProductsSuccess({ response: products });
                }),
                catchError(
                    (httpError) => of(getProductsError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public addProduct$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addProductPending),
        mergeMap((request) => this.productService.addProduct(request)
            .pipe(
                map((response: IResponseError) => {
                    if (response.error == null) {
                        return addProductSuccess();
                    } else {
                        return addProductError({ error: response.error });
                    }
                }),
                catchError(
                    (httpError) => of(addProductError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public removeProduct$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(removeProductPending),
        mergeMap((id) => this.productService.removeProduct(id)
            .pipe(
                map((response: IResponseError) => {
                    if (response.error == null) {
                        return removeProductSuccess();
                    } else {
                        return removeProductError({ error: response.error });
                    }
                }),
                catchError((httpError) =>
                    of(removeProductError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
