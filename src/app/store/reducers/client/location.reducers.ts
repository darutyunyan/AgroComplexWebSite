import { Action, createReducer, on } from '@ngrx/store';
import { getLocationError, getLocationPending, getLocationSuccess } from '../../actions/client/location.action';
import { ILocationState } from '../../models/client.model';

const initialState: ILocationState = {
    coordinates: {
        lat: null,
        lng: null,
    },
    loading: false,
    error: null
};

const locationReducer = createReducer(
    initialState,
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
