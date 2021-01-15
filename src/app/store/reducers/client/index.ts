import { IProductState } from '../../models/client.model';
import clientReducer from '../client/client.reducers';

export interface IClientState {
    clientState: IProductState;
}

export const clientReducers = {
    clientState: clientReducer,
};
