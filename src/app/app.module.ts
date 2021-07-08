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
import {JobofferComponent} from './joboffer/joboffer.component';
import { VerificationcheckComponent } from './verificationcheck/verificationcheck.component';
import { TrackCapsDirective } from './trackcaps.directive';
import { VacancyDetailsComponent } from './vacancies/vacancy-details/vacancy-details.component';
import { SubMenuComponent } from './_components/sub-menu/sub-menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
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
    TrackCapsDirective,
    WidgetComponent,
    CardVacancyComponent,
    VacancyOverviewComponent,
    VacancyDetailsComponent,
    SubMenuComponent,
    DashboardComponent,
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [authInterceptorProviders, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
