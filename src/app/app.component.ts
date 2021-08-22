
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService, TokenStorageService } from './_services';
import { Router, ActivatedRoute} from '@angular/router';
import { ChatService } from './_services/chat.service';
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

    constructor(
        public chatService: ChatService,
        private router: Router, 
        private tokenStorageService: TokenStorageService, 
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.chatService.login();
        this.chatService.addMessageListener();
        this.tokenStorageService.useRememberMe();
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if(this.isLoggedIn) {
            let userInfo = this.tokenStorageService.getUserInfo();
            this.showAdminBoard = (userInfo.Role == 'ROLE_ADMIN');
            this.showModeratorBoard = (userInfo.Role == 'ROLE_MODERATOR');
            this.sidebar.nativeElement.style.display = 'block';
        }
        else {
            this.sidebar.nativeElement.style.display = 'none';
        }
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

        this.sidebar.nativeElement.style.display = 'none';
        this.router.navigate(['/login']);
    }
}
