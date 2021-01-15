import { createAction, props } from '@ngrx/store';
import { IGetAllResponse, IGetProductByIdResponse } from '../../models/client.model';
import { IError } from '../../models/error';

export enum ClientActions {
    GetProductsPending = '[Product] Get products pending',
    GetProductsSuccess = '[Product] Get products success',
    GetProductsError = '[Product] Get products error',

    GetProductByIdPending = '[Product] Get product by id pending',
    GetProductByIdSuccess = '[Product] Get product by id success',
    GetProductByIdError = '[Product] Get product by id error',

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

export const getProductByIdPending = createAction(
    ClientActions.GetProductByIdPending,
    props<{ id: string }>()
);

export const getProductByIdSuccess = createAction(
    ClientActions.GetProductByIdSuccess,
    props<{ response: IGetProductByIdResponse }>()
);

export const getProductByIdError = createAction(
    ClientActions.GetProductByIdError,
    props<{ error: IError }>()
);

export const clearProductError = createAction(
    ClientActions.ClearProductError
);
