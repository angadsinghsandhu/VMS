import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { userModel } from '../models/models';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiURL + '/auth';

@Injectable({
  providedIn: 'root'
})

// Provide User Object
export class UserService {
  //injecting http client
  constructor(private httpClient: HttpClient) { }

  // setting up url
  private _url: string = '../assets/data/test.json';

  getUser(): Observable<any> {
    // BACKEND_URL = BACKEND_URL + '/'; 

    // getting responce from http request
    // returning user object
    const x = this.httpClient.get<userModel>(this._url)
      .pipe(catchError(this.handleError));
    return x;
  }

  getUserEmployee(url: string): Observable<any> {
    // generating params
    let param = new HttpParams()
      .set("entry_num", "1")
      .set("emp_id", "1234");

    // with params 
    // const x = this.httpClient.get<userModel>(this._url, { params: param})

    // getting responce from http request
    // returning user object
    const x = this.httpClient.get<userModel>(this._url)
      .pipe(catchError(this.handleError));
    return x;
  }

  postUser(user): Observable<any> {
    const SIGNUP_URL = BACKEND_URL + '/signup';

    // getting responce from http request
    // returning user object
    const x = this.httpClient.post<userModel>(SIGNUP_URL, user)
      .pipe(catchError(this.errorHandler));
    return x;
  }

  private errorHandler(err: HttpErrorResponse) {
    return throwError(err);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`Client Side Error ${error.message}`);
    } else {
      console.log(`Server Side Error ${error.message}`);
    }

    return throwError(error.message || "Server Error")
  }
}
