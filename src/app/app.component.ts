import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService, TokenStorageService } from './_services';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private roles: string[] = [];
    menuEnabled = true;
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;

    @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;

    constructor(private router: Router, private tokenStorageService: TokenStorageService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        
        this.tokenStorageService.useRememberMe();
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

            this.username = user.username;
            this.sidebar.nativeElement.style.display = 'block';
        }else{
            this.sidebar.nativeElement.style.display = 'none';
        }

        /*
        $('#sidebarCollapse').on('click', function () {
            console.log('KLIK');
            $('#sidebar').toggleClass('active');
        });
        */
    }

    toggleMenu(): void {
        this.menuEnabled = !this.menuEnabled;

        if(this.menuEnabled) {
            this.sidebar.nativeElement.classList.remove("active");
        }
        else {
            this.sidebar.nativeElement.classList.add("active");
        }
    }

    logout(): void {
        this.tokenStorageService.signOut();
        this.router.navigate(['/login']);
    }
    
}
