import { IError } from './error';

export interface ITypeState extends ITypesResponse {
    loaded: boolean;
    successOperation: boolean;
}

export interface ITypesResponse {
    items: ITypeItem[];
    error: IError;
}

export interface ITypeItem {
    id: string;
    name: string;
}

export interface INameState extends IProductNamesResponse {
    loaded: boolean;
    successOperation: boolean;
}

export interface IProductNamesResponse {
    items: INameItem[];
    error: IError;
}

export interface INameItem {
    id: string;
    name: string;
    type: string;
}

export interface IProductState extends IProductResponse {
    loaded: boolean;
    successOperation: boolean;
}

export interface IProductResponse {
    items: IProductItem[];
    error: IError;
}

export interface IProductItem {
    id: string;
    info: string;
    productType: string;
    productName: string;
    columnType: string;
}

export interface IAccountState {
    loginResponse: ILoginResponse;
}

export interface ILoginResponse {
    liveTime: string;
    token: string;
    error: IError;
}
