
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'LSc1ENRqhcuzDr54PGvig2w1DjjAe92u',
    domain: 'myhomevihanga.auth0.com',
    responseType: 'token id_token',
    audience: 'https://myhomevihanga.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200',
    scope: 'openid'
  });

  lock = new Auth0Lock(
    'LSc1ENRqhcuzDr54PGvig2w1DjjAe92u',
    'myhomevihanga.auth0.com', {
      theme: {
        logo: 'https://res.cloudinary.com/myhomevihanga/image/upload/c_fill,g_auto:none,r_20,w_230/v1504176663/myhomevihangalogo_gxflwi.jpg'
      },
      languageDictionary: {
        title: "My Home Vihanga"
      },
      auth: {
        //redirectUrl:'http://localhost:4200',
        redirect:false,
        responseType: 'token id_token',
        params: {
          //state: this.router.routerState,
          scope: 'openid profile email user_birthday',
          audience: 'https://myhomevihanga.auth0.com/userinfo'
        }
      }
    }
  );
  loginResolve;
  loginReject;
  constructor(public router: Router) {
    this.lock.on("authenticated", (authResult) => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          this.loginReject();
          return;
        }
        //document.getElementById('nick').textContent = profile.nickname;
        this.setSession(authResult);
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.loginResolve(true);
        this.lock.hide();
      });
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }
  public login(): Promise<boolean> {
    this.lock.show();
    return new Promise<boolean>((res, rej) => {
      this.loginResolve=res;
      this.loginReject=rej;
    });
    
  }


  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}