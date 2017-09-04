import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from "./registration/registration.component";
import {LandingComponent} from "./landing/landing.component";
import {AuthGuard} from './auth.guard';


export const ROUTES: Routes = [
  { path: '', component: LandingComponent },
  {path:'register',component:RegistrationComponent, canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo: '' }
];