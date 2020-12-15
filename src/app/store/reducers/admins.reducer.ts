import { Action, createReducer, on } from '@ngrx/store';
import {
  addProductTypeError, addProductTypePending, addProductTypeSuccess,
  getProductTypesError, getProductTypesSuccess,
  removeProductTypeError, removeProductTypePending, removeProductTypeSuccess } from '../actions/admins.action';
import { IProductTypesResponse } from '../models/admins.model';

const initialState: IProductTypesResponse = {
  productTypes: [],
  error: null,
  loaded: false,
  successOperation: false,
};

const productTypesReducer = createReducer(
  initialState,
  on(getProductTypesSuccess, (state, action) => {
    return {
      ...state,
      productTypes: action.response.productTypes,
      error: action.response.error,
      loaded: true
    };
  }),
  on(getProductTypesError, (state, action) => {
    return {
      ...state,
      productTypes: [],
      error: action.error,
      loaded: false
    };
  }),
  on(addProductTypePending, (state) => {
    return {
      ...state,
      successOperation: false
    };
  }),
  on(addProductTypeSuccess, (state) => {
    return {
      ...state,
      successOperation: true
    };
  }),
  on(addProductTypeError, (state, action) => {
    return {
      ...state,
      successOperation: false,
      error: action.error
    };
  }),
  on(removeProductTypePending, (state) => {
    return {
      ...state,
      successOperation: false
    };
  }),
  on(removeProductTypeSuccess, (state) => {
    return {
      ...state,
      successOperation: true
    };
  }),
  on(removeProductTypeError, (state, action) => {
    return {
      ...state,
      successOperation: false,
      error: action.error
    };
  })
);

export default function reducer(state: any, action: Action): any {
  return productTypesReducer(state, action);
}
