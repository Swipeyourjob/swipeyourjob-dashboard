import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class PasswordValidator {
  constructor() { }
    public checkLength(validateString: string) : boolean {
        if(validateString != null && validateString.length >= 7){
            return true;
        }else{
            return false;
        }
    }
    public checkNumber(validateString: string) : boolean {
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
    private validpassword(validateString: string) : boolean {
        let numcheck : boolean = this.checkNumber(validateString);
        let lencheck : boolean = this.checkLength(validateString);
        let capitalcheck : boolean = this.checkCapital(validateString);
        if(numcheck && lencheck && capitalcheck){
            return true;
        }else{
            return false;
        }
    }
    public passwordeqauls(validateString: string, repeatedString: string){
        let valid = this.validpassword(validateString);
        if(valid && validateString == repeatedString){
            return true;
        }else{
            return false;
        }
    }
    public checkCapital(validateString: string) : boolean {
        let hasCapital: boolean = false;
        const regex = new RegExp('[A-Z]+');
        if(validateString != null && regex.test(validateString)){    
            return true;
        }
        return hasCapital;
    }

}