import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/admin/shared/services/product.service';
import {
    addProductNameError, addProductNamePending, addProductNameSuccess,
    getProductNamesError, getProductNamesPending, getProductNamesSuccess,
    removeProductNameSuccess, removeProductNameError, removeProductNamePending
} from '../../actions/admin/productName.action';
import { IResponseError } from '../../models/error';


@Injectable()
export class ProductNameEffects {
    public getProductNames$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductNamesPending, addProductNameSuccess, removeProductNameSuccess),
        mergeMap(() => this.productService.getProductNames()
            .pipe(
                map(products => {
                    return getProductNamesSuccess({ response: products });
                }),
                catchError((httpError) =>
                    of(getProductNamesError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public addProductName$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addProductNamePending),
        mergeMap((request) => this.productService.addProductName(request)
            .pipe(
                map((response: IResponseError) => {
                    if (response.error == null) {
                        return addProductNameSuccess();
                    } else {
                        return addProductNameError({ error: response.error });
                    }
                }),
                catchError(
                    (httpError) => of(addProductNameError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public removeProductName$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(removeProductNamePending),
        mergeMap((id) => this.productService.removeProductName(id)
            .pipe(
                map((response: IResponseError) => {
                    if (response.error == null) {
                        return removeProductNameSuccess();
                    } else {
                        return removeProductNameError({ error: response.error });
                    }
                }),
                catchError((httpError) =>
                    of(removeProductNameError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
