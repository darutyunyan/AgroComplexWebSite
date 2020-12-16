import { Action, createReducer, on } from '@ngrx/store';
import {
    addColumnTypePending, addColumnTypeSuccess, addColumnTypeError,
    removeColumnTypePending, removeColumnTypeSuccess, removeColumnTypeError,
    getColumnTypeSuccess, getColumnTypeError
} from '../../actions/admin/columnType.action';
import { IColumnTypeState } from '../../models/admins.model';

const initialState: IColumnTypeState = {
    types: [],
    error: null,
    loaded: false,
    successOperation: false,
};

const columnTypesReducer = createReducer(
    initialState,
    on(getColumnTypeSuccess, (state, action) => {
        return {
            ...state,
            types: action.response.types,
            error: action.response.error,
            loaded: true,
            successOperation: false
        };
    }),
    on(getColumnTypeError, (state, action) => {
        return {
            ...state,
            types: [],
            error: action.error,
            loaded: false
        };
    }),
    on(addColumnTypePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addColumnTypeSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addColumnTypeError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(removeColumnTypePending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(removeColumnTypeSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(removeColumnTypeError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    })
);

export default function reducer(state: IColumnTypeState, action: Action): any {
    return columnTypesReducer(state, action);
}
