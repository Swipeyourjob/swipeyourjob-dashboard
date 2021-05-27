export interface Company {
    companyname: string,
    zipcode: string,
    kvk: string,
    email: string,
    password: string,
    passwordrepeat: string,
    subscribe: boolean,
    terms: boolean,
    description?: string
}
