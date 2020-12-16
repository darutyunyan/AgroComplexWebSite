import { IColumnTypeState, IProductTypeState } from './models/admins.model';
import { IMessageData } from './models/message.model';

import productTypesReducer from './reducers/admin/productType.reducer';
import columnTypesReducer from './reducers/admin/columnType.reducer';
import messageReducer from './reducers/message.reducer';

export interface IState {
    productTypeState: IProductTypeState;
    columnTypeState: IColumnTypeState;
    messageData: IMessageData;
}

export const reducers = {
    productTypeState: productTypesReducer,
    columnTypeState: columnTypesReducer,
    messageData: messageReducer
};

