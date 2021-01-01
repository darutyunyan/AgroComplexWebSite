import { createAction, props } from '@ngrx/store';
import { ILoginResponse } from '../../models/admins.model';
import { IError } from '../../models/error';

export enum AccountActions {
    LoginPending = '[Account] Login pending',
    LoginSuccess = '[Account] Login success',
    LoginError = '[Account] Login error',
}

export const loginPending = createAction(
    AccountActions.LoginPending,
    props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
    AccountActions.LoginSuccess,
    props<{ reponse: ILoginResponse }>()
);

export const loginError = createAction(
    AccountActions.LoginError,
    props<{ error: IError }>()
);