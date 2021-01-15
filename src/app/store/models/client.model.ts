import { IError } from './error';

export interface IProductState {
    products: IGetAllResponse;
    loading: boolean;
    error: IError;
    productById: IGetProductByIdResponse;
}
export interface IGetAllResponse {
    items: IGetAllItem[];
    error: IError;
}

export interface IGetAllItem {
    typeName: string;
    items: INameItem[];
}

export interface INameItem {
    id: string;
    name: string;
}

export interface IGetProductByIdResponse {
    loading: boolean;
    productName: string;
    columnNames: string[];
    info: string[][];
    error: IError;
}

