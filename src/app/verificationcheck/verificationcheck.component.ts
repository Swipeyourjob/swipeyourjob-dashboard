import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, TokenStorageService } from '../_services';

@Component({
  selector: 'app-verificationcheck',
  templateUrl: './verificationcheck.component.html',
  styleUrls: ['./verificationcheck.component.css']
})
export class VerificationcheckComponent implements OnInit {
  status = "nok";
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      let email = params['email'];
      let verificationcode = params['verification'];
      console.log(email);
      console.log(verificationcode);
      this.authService.verify(email,verificationcode).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token,false);
          this.tokenStorage.saveUser(data);
          window.location.href = '/';
        },
        err => {
          this.status = err.error.status;
          console.log(err.status);
        }
      );
      

    });
  }
}
