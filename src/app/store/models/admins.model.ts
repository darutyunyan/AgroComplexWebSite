import { IError } from './error';

export interface IProductTypeState extends IProductTypesResponse {
    loaded: boolean;
    successOperation: boolean;
}

export interface IColumnTypeState extends IColumnTypesResponse {
    loaded: boolean;
    successOperation: boolean;
}

export interface IProductTypesResponse {
    types: IItem[];
    error: IError;
}

export interface IColumnTypesResponse {
    types: IItem[];
    error: IError;
}

export interface IItem {
    id: string;
    name: string;
}
