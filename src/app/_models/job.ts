export class Job {
    constructor(
    public jobinfo: JobInfo,
    public joblocation: JobLocation,
    public jobimages: string
    ){}
}
export class JobInfo {
    id!: number;
    title!: string;
    description!: string;
    salary!: string;
    minhours!: number;
    maxhours!: number;
}
export class JobLocation {
    city!: string;
    streetname!: string;
    housenumber!: string;
    zipcode!: string;
    distance!: string;
    latitude!: string;
    longitude!: string;
}   