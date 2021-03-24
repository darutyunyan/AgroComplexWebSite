import { Action, createReducer, on } from '@ngrx/store';
import { addUpdateProductError, addUpdateProductPending, addUpdateProductSuccess,
        clearProductError, getProductsError, getProductsSuccess, removeProductError, removeProductPending, removeProductSuccess } from '../../actions/admin/product.action';
import { IProductState } from '../../models/admins.model';

const initialState: IProductState = {
    items: [],
    error: null,
    loaded: false,
    successOperation: false,
};

const productReducer = createReducer(
    initialState,
    on(getProductsSuccess, (state, action) => {
        return {
            ...state,
            items: action.response.items,
            error: action.response.error,
            loaded: true,
            successOperation: false
        };
    }),
    on(getProductsError, (state, action) => {
        return {
            ...state,
            items: [],
            error: action.error,
            loaded: false
        };
    }),
    on(addUpdateProductPending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addUpdateProductSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addUpdateProductError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(removeProductPending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(removeProductSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(removeProductError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(clearProductError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);

export default function reducer(state: IProductState, action: Action): any {
    return productReducer(state, action);
}
