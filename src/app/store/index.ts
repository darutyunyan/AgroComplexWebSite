import { IProductTypesResponse } from './models/admins.model';
import { IMessageData } from './models/message.model';

import productTypesReducer from './reducers/admins.reducer';
import messageReducer from './reducers/message.reducer';

export interface IState {
    productTypesResponse: IProductTypesResponse;
    messageData: IMessageData
}

export const reducers = {
    productTypesResponse: productTypesReducer,
    messageData: messageReducer
};

