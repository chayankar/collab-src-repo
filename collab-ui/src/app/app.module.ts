import { UserRegistrationModule } from './user-registration/user-registration.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { LoginModule } from './login/login.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthService } from './services/auth-service/auth.service';
import * as CryptoJs from 'crypto-js';

@NgModule({
   declarations: [
      AppComponent,
      AdminLayoutComponent
   ],
   imports: [
      BrowserAnimationsModule,
      RouterModule.forRoot(AppRoutes),
      LoginModule,
      SidebarModule,
      NavbarModule,
      ToastrModule.forRoot(),
      FooterModule,
      FixedPluginModule,
      UserRegistrationModule
   ],
   providers: [AuthService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
