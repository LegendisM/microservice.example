export interface IPagination<T> {
    items: T[];
    limit: number;
    page: number;
    total: number;
}