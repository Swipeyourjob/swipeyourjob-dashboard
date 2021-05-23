import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { AlertComponent } from './_components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { authInterceptorProviders } from '@app/helpers';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    AlertComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CompanyProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule, 
    CKEditorModule
  ],
  providers: [authInterceptorProviders, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
