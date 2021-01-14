import { IClientState } from '../../models/client.model';
import clientReducer from '../client/client.reducers';

export interface IStateClient {
    clientState: IClientState;
}

export const clientReducers = {
    clientState: clientReducer,
};
