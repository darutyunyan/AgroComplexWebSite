import { Action, createReducer, on } from '@ngrx/store';
import {
    clearProductError, getProductByIdError, getProductByIdPending,
    getProductByIdSuccess, getProductsError, getProductsPending, getProductsSuccess
} from '../../actions/client/client.actions';
import { IProductState } from '../../models/client.model';

const initialState: IProductState = {
    products: null,
    error: null,
    loading: false,
    productById: {
        loading: false,
        productName: null,
        columnNames: [],
        info: null,
        error: null,
    }
};

const clientReducer = createReducer(
    initialState,
    on(getProductsPending, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(getProductsSuccess, (state, action) => {
        return {
            ...state,
            products: {
                items: action.response.items
            },
            loading: false,
        };
    }),
    on(getProductsError, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        };
    }),
    on(getProductByIdPending, (state) => {
        return {
            ...state,
            productById: {
                loading: true
            }
        };
    }),
    on(getProductByIdSuccess, (state, action) => {
        return {
            ...state,
            productById: {
                loading: false,
                productName: action.response.productName,
                columnNames: action.response.columnNames,
                info: action.response.info,
            },
        };
    }),
    on(getProductByIdError, (state, action) => {
        return {
            ...state,
            error: action.error,
            productById: {
                loading: false
            }
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
    return clientReducer(state, action);
}
