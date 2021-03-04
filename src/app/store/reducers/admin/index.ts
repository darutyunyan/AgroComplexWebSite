import { IAccountState, INameState, IProductState, ITypeState } from '../../models/admins.model';
import { IMessageData } from '../../models/message.model';
import { ILocationState } from '../../models/client.model';

import accountReducer from './account.reducer';
import productReducer from './product.reducers';
import productTypesReducer from './productType.reducer';
import columnTypesReducer from './columnType.reducer';
import productNamesReducer from './productName.reducer';
import messageReducer from '../message.reducer';
import locationReducer from '../shared/location.reducers';


export interface IAdminState {
    adminState: IState;
}

export interface IState {
    accountState: IAccountState;
    productState: IProductState;
    productTypeState: ITypeState;
    columnTypeState: ITypeState;
    productNameState: INameState;
    locationState: ILocationState;
    messageData: IMessageData;
}

export const adminReducers = {
    accountState: accountReducer,
    productState: productReducer,
    productTypeState: productTypesReducer,
    columnTypeState: columnTypesReducer,
    productNameState: productNamesReducer,
    locationState: locationReducer,
    messageData: messageReducer
};

