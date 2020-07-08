import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  private defaultAllowedRoutes: string[] = [];

  constructor(private authSvc: AuthService, private router: Router) { this.setupDefaultAllowedRoutes(); }

  setupDefaultAllowedRoutes() {
    this.defaultAllowedRoutes.push('/register');
    this.defaultAllowedRoutes.push('/login');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.defaultAllowedRoutes.find(x => x === state.url.toLowerCase())) {
      return true;
    } else {
      const isAuthentticated = this.authSvc.isAuthenticated()
      if (isAuthentticated) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }
}
