import { Action, createReducer, on } from '@ngrx/store';
import {
    addProductNameError, addProductNamePending, addProductNameSuccess,
    getProductNamesError, getProductNamesSuccess,
    removeProductNameSuccess, removeProductNameError, removeProductNamePending
} from '../../actions/admin/productName.action';
import { INameState } from '../../models/admins.model';

const initialState: INameState = {
    items: [],
    error: null,
    loaded: false,
    successOperation: false,
};

const productNamesReducer = createReducer(
    initialState,
    on(getProductNamesSuccess, (state, action) => {
        return {
            ...state,
            items: action.response.items,
            error: action.response.error,
            loaded: true,
            successOperation: false
        };
    }),
    on(getProductNamesError, (state, action) => {
        return {
            ...state,
            items: [],
            error: action.error,
            loaded: false
        };
    }),
    on(addProductNamePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addProductNameSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addProductNameError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(removeProductNamePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(removeProductNameSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(removeProductNameError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    })
);

export default function reducer(state: INameState, action: Action): any {
    return productNamesReducer(state, action);
}
