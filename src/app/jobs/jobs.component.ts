import { Component, OnInit } from '@angular/core';

import { User } from '@app/_models';
import { AuthService } from '@app/_services';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.less']
})
export class JobsComponent implements OnInit {
  

  constructor() {
      
  }

  ngOnInit(): void {
  }

}
