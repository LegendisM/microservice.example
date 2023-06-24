export interface IServiceResponse<T = object> {
    state: boolean;
    data: T;
    message?: string;
}