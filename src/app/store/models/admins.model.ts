import { IError } from './error';

export interface IProductTypesResponse {
    productTypes: IProductType[];
    error: IError;
    loaded: boolean;
    successOperation: boolean;
}

export interface IProductType {
    id: string;
    name: string;
}
