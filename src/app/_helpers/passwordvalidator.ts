import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidator {
  constructor() {
  }

  public checkLength(validateString: string): boolean {
    if (validateString != null && validateString.length >= 7) {
      return true;
    } else {
      return false;
    }
  }

  public checkNumber(validateString: string): boolean {
    let hasNumber = false;
    if (validateString != null) {
      for (const letter in validateString.split('')) {
        if (letter) {
          hasNumber = true;
        }
      }
    }
    return hasNumber;
  }

  private validpassword(validateString: string): boolean {
    const numcheck: boolean = this.checkNumber(validateString);
    const lencheck: boolean = this.checkLength(validateString);
    const capitalcheck: boolean = this.checkCapital(validateString);
    if (numcheck && lencheck && capitalcheck) {
      return true;
    } else {
      return false;
    }
  }

  public passwordequals(validateString: string, repeatedString: string): boolean {
    const valid = this.validpassword(validateString);
    if (valid && validateString === repeatedString) {
      return true;
    } else {
      return false;
    }
  }

  public checkCapital(validateString: string): boolean {
    const hasCapital = false;
    const regex = new RegExp('[A-Z]+');
    if (validateString != null && regex.test(validateString)) {
      return true;
    }
    return hasCapital;
  }

}
