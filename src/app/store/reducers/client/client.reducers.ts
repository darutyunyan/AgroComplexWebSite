import { Action, createReducer, on } from '@ngrx/store';
import { clearProductError, getProductsError, getProductsPending, getProductsSuccess } from '../../actions/client/client.actions';
import { IClientState } from '../../models/client.model';

const initialState: IClientState = {
    items: [],
    error: null,
    loading: false,
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
            items: action.response.items,
            error: action.response.error,
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
    on(clearProductError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);

export default function reducer(state: IClientState, action: Action): any {
    return clientReducer(state, action);
}
