import { IClientInitialState } from '../../models/client.model';
import clientReducer from '../client/client.reducers';

export interface IClientState {
    clientState: IClientInitialState;
}

export const clientReducers = {
    clientState: clientReducer,
};
