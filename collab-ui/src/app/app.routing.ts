import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RouteGuardService } from './services/route-guard/route-guard.service';

export const AppRoutes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'register', loadChildren: './user-registration/user-registration.module#UserRegistrationModule'},
  // {
  //   path: '', component: AdminLayoutComponent, canActivate: [RouteGuardService],
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  //     }]
  // },
  { path: '', loadChildren: './login/login.module#LoginModule' },
  {
    path: '', component: AdminLayoutComponent,
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    canActivate: [RouteGuardService]
  },
  { path: '**', redirectTo: 'login' }
]
