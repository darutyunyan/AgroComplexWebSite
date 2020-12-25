import { createAction, props } from '@ngrx/store';
import { IProductResponse } from '../../models/admins.model';
import { IError } from '../../models/error';

export enum ProductActions {
    GetProductsPending = '[Product] Get product pending',
    GetProductsSuccess = '[Product] Get product success',
    GetProductsError = '[Product] Get product error',

    AddProductPending = '[Product] Add product pending',
    AddProductSuccess = '[Product] Add product success',
    AddProductError = '[Product] Add product error',

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

export const addProductPending = createAction(
    ProductActions.AddProductPending,
    props<{ info: string, productNameId: string, columnTypeId: string }>()
);

export const addProductSuccess = createAction(
    ProductActions.AddProductSuccess
);

export const addProductError = createAction(
    ProductActions.AddProductError,
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
