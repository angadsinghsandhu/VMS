import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { EmpDashComponent } from './emp-dash/emp-dash.component';
import { CreateComponent } from './emp-dash/create/create.component';
import { EditComponent } from './emp-dash/edit/edit.component';

import { GuardDashComponent } from './guard-dash/guard-dash.component';
import { EntryComponent } from './guard-dash/entry/entry.component';
import { CheckComponent } from './guard-dash/check/check.component';
import { ExitComponent } from './guard-dash/exit/exit.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { TestComponent } from './test/test.component';

// importing routes
const routes: Routes = [

  { path: "", redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },

  { path: "auth", component: AuthComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },

  { path: "empDash", component: EmpDashComponent },
  { path: 'empDash/create', component: CreateComponent },
  { path: 'empDash/edit/:entry_num', component: EditComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: "guardDash", component: GuardDashComponent },
  { path: 'guardDash/entry/:emp_id/:entry_num', component: EntryComponent },
  { path: 'guardDash/check', component: CheckComponent },
  { path: 'guardDash/exit', component: ExitComponent },

  { path: "test", component: TestComponent },
  { path: "**", component: PageNotFoundComponent } // Wildcard Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// defining and exporting routes
export const routingComponents = [
  HomeComponent,
  AuthComponent,
  LoginComponent,
  SignupComponent,
  EmpDashComponent,
  CreateComponent,
  EditComponent,
  DashboardComponent,
  GuardDashComponent,
  EntryComponent,
  CheckComponent,
  ExitComponent,
  TestComponent,
  PageNotFoundComponent
];
