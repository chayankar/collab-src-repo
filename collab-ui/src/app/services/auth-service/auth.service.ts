import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieSvc: CookieService) { }

  public isAuthenticated(): boolean {
    return true;
  }

  logout() {
    this.cookieSvc.deleteAll();
  }
}
