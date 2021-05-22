import { Role } from './role';
export interface User {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    isDeleting: boolean;
}
export interface ReadonlyUser {
    readonly id: string;
    readonly title: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly role: Role;
    readonly isDeleting: boolean;
}