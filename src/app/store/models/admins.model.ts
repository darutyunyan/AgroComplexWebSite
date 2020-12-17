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