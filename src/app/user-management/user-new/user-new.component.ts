import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    function: null,
    establishment: null
  };

  isLoggedIn = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Creating new user... ');
    console.log(this.form);
  }

  }
