import { Action, createReducer, on } from '@ngrx/store';
import { loginError, loginSuccess } from '../../actions/admin/acctount.action';
import { IAccountState } from '../../models/admins.model';

const initialState: IAccountState = {
    loginResponse: null
};

const accountReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            loginResponse: action.reponse
        };
    }),
    on(loginError, (state, action) => {
        return {
            ...state,
            loginResponse: {
                liveTime: null,
                token: null,
                error: action.error
            }
        };
    })
);

export default function reducer(state: IAccountState, action: Action): any {
    return accountReducer(state, action);
}
