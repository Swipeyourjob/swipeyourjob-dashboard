import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class ZipcodeValidator{
    constructor(){}
    public checkLength(validateString: string) : boolean {
        if(validateString != null && validateString.length >= 6){
            return true;
        }else{
            return false;
        }
    }
    public checkRegex(validateString: string) : boolean {
        const regexp: RegExp = /^(\d{4})\s*([A-Z]{2})$/i
        if(validateString != null && regexp.test(validateString)){
            return true;
        }else{
            return false;
        }
    }
}