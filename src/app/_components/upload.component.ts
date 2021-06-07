import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../_services';

@Component({ selector: 'upload', templateUrl: 'upload.component.html' })
export class UploadComponent implements OnInit, OnDestroy {
    @Input() id = 'default-upload';
    @Input() fade = true;

    uploadSubscription!: Subscription;
    routeSubscription!: Subscription;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
           
    }

    ngOnDestroy() {
        
    }

}