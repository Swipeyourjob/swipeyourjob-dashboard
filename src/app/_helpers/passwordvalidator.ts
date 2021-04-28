import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class PasswordValidator {
  constructor() { }
    public checkLength(validateString: string) : Boolean {
        if(validateString != null && validateString.length >= 7){
            return true;
        }else{
            return false;
        }
    }
    public checkNumber(validateString: string) : Boolean {
        let hasNumber: boolean = false;
        if(validateString != null){    
            for (let letterindex = 0; letterindex < validateString.length; letterindex++) {
                let  letter = parseFloat(validateString[letterindex]);
                if(letter){
                    hasNumber = true;
                }
            }
        }
        return hasNumber;
    }
    public checkCapital(validateString: string) : Boolean {
        let hasCapital: boolean = false;
        const regex = new RegExp('[A-Z]+');
        if(validateString != null && regex.test(validateString)){    
            return true;
        }
        return hasCapital;
    }

}