import { createAction, props } from '@ngrx/store';
import { IProductTypesResponse } from '../models/admins.model';
import { IError } from '../models/error';

export enum AdminActions {
  GetProductTypesPending = '[Product Type] Get product types pending',
  GetProductTypesSuccess = '[Product Type] Get product types success',
  GetProductTypesError = '[Product Type] Get product types error',

  AddProductTypePending = '[Product Type] Add product type pending',
  AddProductTypeSuccess = '[Product Type] Add product type success',
  AddProductTypeError = '[Product Type] Add product type error',

  RemoveProductTypePending = '[Product Type] Remove product type prending',
  RemoveProductTypeSuccess = '[Product Type] Remove product type success',
  RemoveProductTypeError = '[Product Type] Remove product type error',
}

export const getProductTypesPending = createAction(
  AdminActions.GetProductTypesPending
);

export const getProductTypesSuccess = createAction(
  AdminActions.GetProductTypesSuccess,
  props<{ response: IProductTypesResponse }>()
);

export const getProductTypesError = createAction(
  AdminActions.GetProductTypesError,
  props<{ error: IError }>()
);

export const addProductTypePending = createAction(
  AdminActions.AddProductTypePending,
  props<{ name: string }>()
);

export const addProductTypeSuccess = createAction(
  AdminActions.AddProductTypeSuccess
);

export const addProductTypeError = createAction(
  AdminActions.AddProductTypeError,
  props<{ error: IError }>()
);

export const removeProductTypePending = createAction(
  AdminActions.RemoveProductTypePending,
  props<{ id: string  }>()
);

export const removeProductTypeSuccess = createAction(
  AdminActions.RemoveProductTypeSuccess
);

export const removeProductTypeError = createAction(
  AdminActions.RemoveProductTypeError,
  props<{ error: IError }>()
);
