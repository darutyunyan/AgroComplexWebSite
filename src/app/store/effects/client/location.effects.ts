import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LocationService } from 'src/app/shared/services/location.service';
import { getLocationError, getLocationPending, getLocationSuccess } from '../../actions/client/location.action';
import { ILocationResponse } from '../../models/client.model';


@Injectable()
export class LocationEffects {
    public getCoordinates$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(getLocationPending),
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
