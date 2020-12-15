import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/admin/shared/services/product.service';
import {
    addProductTypeError, addProductTypePending, addProductTypeSuccess,
    getProductTypesError, getProductTypesPending, getProductTypesSuccess,
    removeProductTypeSuccess, removeProductTypeError, removeProductTypePending
} from '../actions/admins.action';
import { IResponseError } from '../models/error';

@Injectable()
export class AdminsEffects {
    public getProductTypes$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductTypesPending, addProductTypeSuccess, removeProductTypeSuccess),
        mergeMap(() => this.productService.getProductTypes()
            .pipe(
                map(products => {
                    return getProductTypesSuccess({ response: products });
                }),
                catchError((httpError) =>
                    of(getProductTypesError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public addProductType$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addProductTypePending),
        mergeMap((name) => this.productService.addProductType(name)
            .pipe(
                map((response: IResponseError) => {
                    if (response.error == null) {
                        return addProductTypeSuccess();
                    } else {
                        return addProductTypeError({ error: response.error });
                    }
                }),
                catchError(
                    (httpError) => of(addProductTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public removeProductType$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(removeProductTypePending),
        mergeMap((id) => this.productService.removeProductType(id)
            .pipe(
                map((response: IResponseError) => {
                    if (response.error == null) {
                        return removeProductTypeSuccess();
                    } else {
                        return removeProductTypeError({ error: response.error });
                    }
                }),
                catchError((httpError) =>
                    of(removeProductTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
