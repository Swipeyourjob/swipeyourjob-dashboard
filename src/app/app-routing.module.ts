import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {RegisteredComponent} from './register/registered/registered.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {VerificationComponent} from './verification/verification.component';
import {VerificationcheckComponent} from './verificationcheck/verificationcheck.component';
import {AuthGuard} from './_helpers';
import {CompanyProfileComponent} from './company-profile/company-profile.component';
import {JobofferComponent} from './joboffer/joboffer.component';

const routes: Routes = [

  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'registered', component: RegisteredComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user', component: BoardUserComponent, canActivate: [AuthGuard]},
  {path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard]},
  {path: 'companyprofile', component: CompanyProfileComponent, canActivate: [AuthGuard]},
  {path: 'verification', component: VerificationComponent, canActivate: [AuthGuard]},
  {path: 'joboffer', component: JobofferComponent, canActivate: [AuthGuard]},
  {path: 'verify', component: VerificationcheckComponent},
  {path: '**', redirectTo: '', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
