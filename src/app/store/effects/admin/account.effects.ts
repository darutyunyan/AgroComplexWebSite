import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { loginError, loginPending, loginSuccess } from '../../actions/admin/account.action';
import { ILoginResponse } from '../../models/admins.model';


@Injectable()
export class AccountEffects {
    public login$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(loginPending),
        mergeMap((request) => this.authService.login(request)
            .pipe(
                map((response: ILoginResponse) => {
                    if (response.error == null) {
                        return loginSuccess({reponse: response});
                    } else {
                        return loginError({ error: response.error });
                    }
                }),
                catchError(
                    (httpError) => of(loginError({ error: { statusCode: httpError.status, message: httpError.message } }))
                )
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }
}
