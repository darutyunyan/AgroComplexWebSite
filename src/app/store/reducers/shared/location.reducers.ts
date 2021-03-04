import { Action, createReducer, on } from '@ngrx/store';
import { addOrUpdateLocationError, addOrUpdateLocationPending, addOrUpdateLocationSuccess,
    getLocationError, getLocationPending, getLocationSuccess } from '../../actions/shared/location.action';
import { ILocationState } from '../../models/client.model';

const initialState: ILocationState = {
    coordinates: {
        lat: null,
        lng: null,
    },
    successOperation: false,
    loading: false,
    error: null
};

const locationReducer = createReducer(
    initialState,
    on(addOrUpdateLocationPending, (state) => {
        return {
            ...state,
            successOperation: false
        };
    }),
    on(addOrUpdateLocationSuccess, (state) => {
        return {
            ...state,
            successOperation: true
        };
    }),
    on(addOrUpdateLocationError, (state, action) => {
        return {
            ...state,
            successOperation: false,
            error: action.error
        };
    }),
    on(getLocationPending, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(getLocationSuccess, (state, action) => {
        return {
            ...state,
            coordinates: {
                lat: action.response.lat,
                lng: action.response.lng
            },
            loading: false,
        };
    }),
    on(getLocationError, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        };
    }),
);

export default function reducer(state: ILocationState, action: Action): any {
    return locationReducer(state, action);
}
