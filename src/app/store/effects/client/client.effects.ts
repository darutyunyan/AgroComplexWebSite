import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ClientProductService } from 'src/app/shared/services/client-product.service';
import { getProductsPending, getProductsSuccess, getProductsError,
    getProductByIdPending, getProductByIdSuccess, getProductByIdError } from '../../actions/client/client.actions';
import { IGetAllResponse, IGetProductByIdResponse } from '../../models/client.model';


@Injectable()
export class ClientEffects {
    public getProducts$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductsPending),
        mergeMap(() => this.productService.getAll()
            .pipe(
                map((products: IGetAllResponse) => {
                    if (products.error == null) {
                        return getProductsSuccess({ response: products });
                    } else {
                        return getProductsError({ error: products.error });
                    }
                }),
                catchError(
                    (httpError) => of(getProductsError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public getProductById$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getProductByIdPending),
        mergeMap((id) => this.productService.getProductById(id)
            .pipe(
                map((products: IGetProductByIdResponse) => {
                    if (products.error == null) {
                        return getProductByIdSuccess({ response: products });
                    } else {
                        return getProductByIdError({ error: products.error });
                    }
                }),
                catchError(
                    (httpError) => of(getProductByIdError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ClientProductService
    ) { }
}
