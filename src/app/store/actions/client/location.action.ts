import { createAction, props } from '@ngrx/store';
import { ILocationResponse } from '../../models/client.model';
import { IError } from '../../models/error';

export enum LocationActions {
    GetLocationPending = '[Location] Get location pending',
    GetLocationSuccess = '[Location] Get location success',
    GetLocationError = '[Location] Get location error',
}

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