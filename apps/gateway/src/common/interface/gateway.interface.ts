export interface IGatewayResponse<T = object> {
    state: boolean;
    data: T;
    message?: string;
}