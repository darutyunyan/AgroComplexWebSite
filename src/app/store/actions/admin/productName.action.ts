import { createAction, props } from '@ngrx/store';
import { IProductNamesResponse } from '../../models/admins.model';
import { IError } from '../../models/error';

export enum ProductNamesActions {
    GetProductNamesPending = '[Product Name] Get product names pending',
    GetProductNamesSuccess = '[Product Name] Get product names success',
    GetProductNamesError = '[Product Name] Get product names error',

    AddProductNamePending = '[Product Name] Add product name pending',
    AddProductNameSuccess = '[Product Name] Add product name success',
    AddProductNameError = '[Product Name] Add product name error',

    RemoveProductNamePending = '[Product Name] Remove product name prending',
    RemoveProductNameSuccess = '[Product Name] Remove product Name success',
    RemoveProductNameError = '[Product Name] Remove product name error',
}

export const getProductNamesPending = createAction(
    ProductNamesActions.GetProductNamesPending
);

export const getProductNamesSuccess = createAction(
    ProductNamesActions.GetProductNamesSuccess,
    props<{ response: IProductNamesResponse }>()
);

export const getProductNamesError = createAction(
    ProductNamesActions.GetProductNamesError,
    props<{ error: IError }>()
);

export const addProductNamePending = createAction(
    ProductNamesActions.AddProductNamePending,
    props<{ name: string, typeId: string }>()
);

export const addProductNameSuccess = createAction(
    ProductNamesActions.AddProductNameSuccess
);

export const addProductNameError = createAction(
    ProductNamesActions.AddProductNameError,
    props<{ error: IError }>()
);

export const removeProductNamePending = createAction(
    ProductNamesActions.RemoveProductNamePending,
    props<{ id: string }>()
);

export const removeProductNameSuccess = createAction(
    ProductNamesActions.RemoveProductNameSuccess
);

export const removeProductNameError = createAction(
    ProductNamesActions.RemoveProductNameError,
    props<{ error: IError }>()
);
