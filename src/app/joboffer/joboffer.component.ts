import {Title} from '@angular/platform-browser';
import {Component, OnInit, OnChanges} from '@angular/core';
import {PasswordValidator} from 'app/_helpers/passwordvalidator';
import {AuthService, TokenStorageService} from '@app/services';

@Component({
  selector: 'app-verification',
  templateUrl: './joboffer.component.html',
  styleUrls: ['./joboffer.component.css']
})
export class JobofferComponent implements OnInit {
  form: any = {
    password: null
  };
  passwordchecks: any = {
    passwordCapitalCheck: false,
    passwordNumberCheck: false,
    passwordLengthCheck: false
  };
  dialogChecks: any = {
    passwordDialog: false
  };
  isLoggedIn = false;
  wagesInputEnabled: any = {
    wages16: false,
    wages17: false,
    wages18: false,
    wages19: false,
    wages20: false,
    wages21: false
  };
  setPeriod = false;

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('SwipeYourJob - Vacature');
    return;
  }

  onCheck(values: any, age: string): void {
    const value = values.currentTarget.checked;
    switch (age) {
      case 'wages16': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages17': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages18': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages19': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages20': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages21': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      default: {
        break;
      }
    }
    console.log(values.currentTarget.checked);
    console.log(this.wagesInputEnabled);
  }
  onSetPeriod(value: any): void {
    this.setPeriod = value;
    console.log('switch date picker visibility');
    console.log(value);
  }
  onSubmit(): void {
  }

}
