import { INameState, ITypeState } from './models/admins.model';
import { IMessageData } from './models/message.model';

import productTypesReducer from './reducers/admin/productType.reducer';
import columnTypesReducer from './reducers/admin/columnType.reducer';
import productNamesReducer from './reducers/admin/productName.reducer';
import messageReducer from './reducers/message.reducer';

export interface IState {
    productTypeState: ITypeState;
    columnTypeState: ITypeState;
    productNameState: INameState;
    messageData: IMessageData;
}

export const reducers = {
    productTypeState: productTypesReducer,
    columnTypeState: columnTypesReducer,
    productNameState: productNamesReducer,
    messageData: messageReducer
};

