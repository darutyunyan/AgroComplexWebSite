import { createAction, props } from '@ngrx/store';
import { IProductResponse } from '../../models/admins.model';
import { IError } from '../../models/error';

export enum ProductActions {
    GetProductsPending = '[Product] Get product pending',
    GetProductsSuccess = '[Product] Get product success',
    GetProductsError = '[Product] Get product error',

    AddUpdateProductPending = '[Product] Add or update product pending',
    AddUpdateProductSuccess = '[Product] Add or update product success',
    AddUpdateProductError = '[Product] Add or update product error',

    RemoveProductPending = '[Product] Remove product pending',
    RemoveProductSuccess = '[Product] Remove product success',
    RemoveProductError = '[Product] Remove product error',

    ClearProductError = '[Product] Clear product error',
}

export const getProductsPending = createAction(
    ProductActions.GetProductsPending
);

export const getProductsSuccess = createAction(
    ProductActions.GetProductsSuccess,
    props<{ response: IProductResponse }>()
);

export const getProductsError = createAction(
    ProductActions.GetProductsError,
    props<{ error: IError }>()
);

export const addUpdateProductPending = createAction(
    ProductActions.AddUpdateProductPending,
    props<{ id?: string, info: string, productNameId: string, columnTypeId: string }>()
);

export const addUpdateProductSuccess = createAction(
    ProductActions.AddUpdateProductSuccess
);

export const addUpdateProductError = createAction(
    ProductActions.AddUpdateProductError,
    props<{ error: IError }>()
);

export const removeProductPending = createAction(
    ProductActions.RemoveProductPending,
    props<{ id: string }>()
);

export const removeProductSuccess = createAction(
    ProductActions.RemoveProductSuccess
);

export const removeProductError = createAction(
    ProductActions.RemoveProductError,
    props<{ error: IError }>()
);

export const clearProductError = createAction(
    ProductActions.ClearProductError
);
