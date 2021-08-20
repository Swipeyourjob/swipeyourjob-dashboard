export interface ForgotPassword {
    email: string;
}

export interface ChangedPassword {
    password: string;
    password2: string;
}

export interface NewPassword {
    password: string;
    email: string;
    code: number;
}