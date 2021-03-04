import { createAction, props } from '@ngrx/store';
import { ILocationResponse } from '../../models/client.model';
import { IError } from '../../models/error';

export enum LocationActions {
    AddOrUpdateLocationPending = '[Location] Add or Update location pending',
    AddOrUpdateLocationSuccess = '[Location] Add or Update location success',
    AddOrUpdateLocationError = '[Location] Add  or Update location error',

    GetLocationPending = '[Location] Get location pending',
    GetLocationSuccess = '[Location] Get location success',
    GetLocationError = '[Location] Get location error',
}

export const addOrUpdateLocationPending = createAction(
    LocationActions.AddOrUpdateLocationPending,
    props<{ lat: string, lng: string }>()
);

export const addOrUpdateLocationSuccess = createAction(
    LocationActions.AddOrUpdateLocationSuccess
);

export const addOrUpdateLocationError = createAction(
    LocationActions.AddOrUpdateLocationError,
    props<{ error: IError }>()
);

export const getLocationPending = createAction(
    LocationActions.GetLocationPending
);

export const getLocationSuccess = createAction(
    LocationActions.GetLocationSuccess,
    props<{ response: ILocationResponse }>()
);

export const getLocationError = createAction(
    LocationActions.GetLocationError,
    props<{ error: IError }>()
);
