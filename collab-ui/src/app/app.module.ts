import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';

import {} from './admin-layout/admin-layout.component';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AdminLayoutModule,
      RouterModule.forRoot(AppRoutes, {
         useHash: true
       })
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
