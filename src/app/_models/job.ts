export interface Job {
    estamblishmentid?: number | null,
    jobName: string | null,
    jobDescription: string | null,
    jobImage: string | null,
    startdate: string | null,
    enddate: string | null,
    avaibility: Array<Availability>,
    tags: string[],
    salary: Array<Salary>
}
export interface Availability {
    morning: boolean, 
    afternoon: boolean, 
    evening: boolean, 
    night: boolean
}
export interface Salary {
    age: number, 
    salary: number,
}
