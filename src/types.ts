export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
}
