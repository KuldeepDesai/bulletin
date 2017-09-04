import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app.routing';
import {AuthService} from "./services/auth.service";
import { RegistrationComponent } from './registration/registration.component';
import { LandingComponent } from './landing/landing.component';
import {AuthGuard} from './auth.guard';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LandingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
