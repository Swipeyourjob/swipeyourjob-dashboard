import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisteredComponent } from './register/registered/registered.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { AlertComponent, UploadComponent, WidgetComponent, CardVacancyComponent } from './_components';
import { VacancyOverviewComponent } from './vacancies/vacancy-overview/vacancy-overview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { authInterceptorProviders } from '@app/helpers';
import {VerificationComponent} from './verification/verification.component';
import {UsermanagementComponent} from './usermanagement/usermanagement.component';
import {JobofferComponent} from './joboffer/joboffer.component';
import { VerificationcheckComponent } from './verificationcheck/verificationcheck.component';
import { TrackCapsDirective } from './trackcaps.directive';
import { VacancyDetailsComponent } from './vacancies/vacancy-details/vacancy-details.component';
import { SubMenuComponent } from './_components/sub-menu/sub-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisteredComponent,
    VerificationComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    AlertComponent,
    UploadComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CompanyProfileComponent,
    JobofferComponent,
    VerificationcheckComponent,
    UsermanagementComponent,
    TrackCapsDirective,
    WidgetComponent,
    CardVacancyComponent,
    VacancyOverviewComponent,
    VacancyDetailsComponent,
    SubMenuComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CKEditorModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
