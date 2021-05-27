import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AlertService, TokenStorageService } from '../../_services';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {
  icons: any = {
    faEnvelopeOpen: faEnvelopeOpen,
  }

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    window.onfocus = function(){
      console.log("focused");
    }

    if (this.tokenStorage.getToken()) {
        window.location.href = '/';
    }
  }

}
