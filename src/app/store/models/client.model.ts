import { IError } from './error';

export interface IClientState extends IGetAllResponse {
    loading: boolean;
}
export interface IGetAllResponse {
    items: IGetAllItem[];
    error: IError;
}


export interface IGetAllItem{
    typeName: string;
    items: INameItem[];
}
export interface INameItem {
    id: string;
    name: string;
}

