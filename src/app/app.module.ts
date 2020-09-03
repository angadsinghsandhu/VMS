import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './auth/auth-interceptor';

// materials components
import { AngularMaterialModule } from './angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule, // materials
    NgbModule
  ],
  providers: [UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: UserService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
