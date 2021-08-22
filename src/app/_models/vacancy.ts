export class VacancyList {
  constructor(public joblist: Array<Vacancy>) {
  }
}

export class Vacancy {
  jobid!: number;
  jobName!: string;
  daysValid!: number;
  amountofreactions!: number;
  amountofrejections!: number;
  images!: Array<string>;
}

export class VacancyUpdate {
  userid!: string;
  status!: string;
  jobid!: number;
}

export interface IVacancyList {
  joblist: Array<Vacancy>;
}

export interface IVacancy {
  jobid: number;
  jobName: string;
  daysValid: number;
  images: Array<string>;
}

export interface VacancyUpdate {
  userid: string;
  status: string;
  jobid: number;
}

export interface UpdateSolication{
    ok: boolean;
    reason: string;
}