import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LocationService } from 'src/app/shared/services/location.service';
import { addOrUpdateLocationError, addOrUpdateLocationPending, addOrUpdateLocationSuccess,
    getLocationError, getLocationPending, getLocationSuccess } from '../../actions/shared/location.action';
import { ILocationResponse } from '../../models/client.model';
import { IResponseError } from '../../models/error';


@Injectable()
export class LocationEffects {
    public addOrUpdateCoordinates: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(addOrUpdateLocationPending),
        mergeMap((coordinates) => this.locationService.addOrUpdateCoordinates(coordinates)
            .pipe(map((response: IResponseError) => {
                if (response.error == null) {
                    return addOrUpdateLocationSuccess();
                } else {
                    return addOrUpdateLocationError({ error: response.error });
                }
            }),
                catchError(
                    (httpError) => of(addOrUpdateLocationError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    public getCoordinates$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getLocationPending, addOrUpdateLocationSuccess),
        mergeMap(() => this.locationService.getCoordinates()
            .pipe(
                map((location: ILocationResponse) => {
                    if (location.error == null) {
                        return getLocationSuccess({ response: location });
                    } else {
                        return getLocationError({ error: location.error });
                    }
                }),
                catchError(
                    (httpError) => of(getLocationError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private locationService: LocationService
    ) { }
}
