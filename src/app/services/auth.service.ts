import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { userModel } from '../models/models';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiURL + '/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient,
    private router: Router) { }

  // variables 
  user = {
    name: null,
    emp_id: null,
    level: null,
    email: null,
    contact_info: null,
    entrys: null,
  }


  private loggedInStatus: boolean = JSON.parse(localStorage
    .getItem('loggedIn') || 'false');

  signup() { }

  login(user): Observable<any> {
    const LOGIN_URL = BACKEND_URL + '/login';

    // getting responce from http post request
    const x = this.httpClient.post(LOGIN_URL, user, { observe: 'response' })
      .pipe(tap(
        data => {
          localStorage.setItem('token', data.body['token']);
          this.user = data['body']['user'];
        },
        err => catchError(this.handleError)
      ))
    return x;
  }

  getIds() {
    // return ["1111", "2222", "1122"];
    const IDS_URL = BACKEND_URL + '/idList';
    return this.httpClient.get<any>(IDS_URL)
  }

  setLoggedIn(value: boolean) {
    localStorage.setItem('loggedIn', value.toString());
  }

  isLoggedIn() {
    return JSON.parse(localStorage
      .getItem('loggedIn') || this.loggedInStatus.toString());
  }

  setUser(user_: userModel) {
    // setting recieved user_ to user
    this.user.name = user_.name;
    this.user.emp_id = user_.emp_id;
    this.user.level = user_.level;
    this.user.email = user_.email;
    this.user.contact_info = user_.contact_info;
    this.user.entrys = user_.entrys;

    localStorage.setItem('user', JSON.stringify(this.user));

    this.setLoggedIn(true);
  }

  updateUser(): Observable<any> {
    const EMP_DASH_URL = environment.apiURL + '/empDash';

    // getting responce from http post request
    return this.httpClient.get(EMP_DASH_URL, { observe: 'response' })
      .pipe(tap(
        data => {
          this.setUser(data['body']);
        },
        err => {
          catchError(this.handleError);
        }
      ))
  }

  getUser() {
    if (this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      this.logout();
    }
  }

  getToken() {
    if (this.isLoggedIn()) {
      return localStorage.getItem('token');
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  handleError(error: HttpErrorResponse) {
    console.warn(error);
    if (error.error instanceof ErrorEvent) {
      console.log(`Client Side Error ${error.message}`);
    } else {
      console.log(`Server Side Error ${error.message}`);
    }

    return throwError(error.message || "Server Error");
  }
}
