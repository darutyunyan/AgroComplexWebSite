import { createAction, props } from '@ngrx/store';
import { IGetAllResponse } from '../../models/client.model';
import { IError } from '../../models/error';

export enum ClientActions {
    GetProductsPending = '[Product] Get product pending',
    GetProductsSuccess = '[Product] Get product success',
    GetProductsError = '[Product] Get product error',

    ClearProductError = '[Product] Clear product error',
}

export const getProductsPending = createAction(
    ClientActions.GetProductsPending
);

export const getProductsSuccess = createAction(
    ClientActions.GetProductsSuccess,
    props<{ response: IGetAllResponse }>()
);

export const getProductsError = createAction(
    ClientActions.GetProductsError,
    props<{ error: IError }>()
);

export const clearProductError = createAction(
    ClientActions.ClearProductError
);
