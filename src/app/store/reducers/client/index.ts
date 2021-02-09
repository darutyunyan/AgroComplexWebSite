import { IClientInitialState, ILocationState } from '../../models/client.model';
import clientReducer from '../client/client.reducers';
import locationReducer from '../client/location.reducers';

export interface IClientState {
    clientState: IClientInitialState;
    locationState: ILocationState;
}

export const clientReducers = {
    clientState: clientReducer,
    locationState: locationReducer,
};
