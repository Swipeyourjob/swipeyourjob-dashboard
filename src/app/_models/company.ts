export class Company {
    constructor(
    public companyinfo: CompanyInfo,
    public companylocation: CompanyLocation,
    public companyimages: string
    ){}
}
export class CompanyInfo {
    id!: number;
    title!: string;
    description!: string;
}
export class CompanyLocation {
    city!: string;
    streetname!: string;
    housenumber!: string;
    zipcode!: string;
}  