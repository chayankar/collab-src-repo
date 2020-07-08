import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieSvc: CookieService, private router: Router) { }

  public isAuthenticated(): boolean {
    const cookie = this.cookieSvc.get('AuthToken');
    return cookie ? true : false;
  }

  // TODO: This is not the right place for logout
  logout() {
    this.cookieSvc.deleteAll();
    this.router.navigate(['/']);
  }
}
