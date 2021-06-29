export class VacancyList{
    constructor(public joblist: Array<Vacancy>) { }
}
export class Vacancy{
    jobid!: number;
    jobName!: string;
    daysValid!: number;
    images!: Array<string>;
}