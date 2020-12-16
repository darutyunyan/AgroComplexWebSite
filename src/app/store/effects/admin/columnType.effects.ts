import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/admin/shared/services/product.service';
import {
    addColumnTypePending, addColumnTypeSuccess, addColumnTypeError,
    removeColumnTypePending, removeColumnTypeSuccess, removeColumnTypeError,
    getColumnTypePending, getColumnTypeSuccess, getColumnTypeError
} from '../../actions/admin/columnType.action';
import { IResponseError } from '../../models/error';


@Injectable()
export class ColumnTypeEffects {
    public getColumnTypes$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getColumnTypePending, addColumnTypeSuccess, removeColumnTypeSuccess),
        mergeMap(() => this.productService.getColumnTypes()
            .pipe(
                map(columnTypes => {
                    return getColumnTypeSuccess({ response: columnTypes });
                }),
                catchError((httpError) =>
                    of(getColumnTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public addColumnType$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addColumnTypePending),
        mergeMap((name) => this.productService.addColumnType(name)
            .pipe(
                map((response: IResponseError) => {
                    if (response.error == null) {
                        return addColumnTypeSuccess();
                    } else {
                        return addColumnTypeError({ error: response.error });
                    }
                }),
                catchError(
                    (httpError) => of(addColumnTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public removeColumnType$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(removeColumnTypePending),
        mergeMap((id) => this.productService.removeColumnType(id)
            .pipe(
                map((response: IResponseError) => {
                    if (response.error == null) {
                        return removeColumnTypeSuccess();
                    } else {
                        return removeColumnTypeError({ error: response.error });
                    }
                }),
                catchError((httpError) =>
                    of(removeColumnTypeError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
