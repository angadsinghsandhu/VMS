import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { userModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  constructor(private httpClient: HttpClient) { }

  onSearch(search): Observable<any> {
    const DASH_URL = environment.apiURL + '/dashboard';
    return this.httpClient.put(DASH_URL, search)
      .pipe(catchError(this.handleError));
  }

  // deleting user
  onDelUser(emp_id: any) {
    const DASH_USER_URL = environment.apiURL + '/dashboard/user/' + emp_id;
    return this.httpClient.delete(DASH_USER_URL)
      .pipe(catchError(this.handleError));
  }

  // updating user
  onUpdateUser(emp_id: any, data) {
    const DASH_USER_URL = environment.apiURL + '/dashboard/user/' + emp_id;
    return this.httpClient.put(DASH_USER_URL, data)
      .pipe(catchError(this.handleError));
  }

  // deleting entry
  onDelEntry(emp_id: any, emtry_num: number) {
    const DASH_ENTRY_URL = environment.apiURL + '/dashboard/entry/' + emp_id + '/' + emtry_num;
    return this.httpClient.delete(DASH_ENTRY_URL)
      .pipe(catchError(this.handleError));
  }

  // updating entry
  onUpdateEntry(emp_id: any, emtry_num: number, data) {
    const DASH_ENTRY_URL = environment.apiURL + '/dashboard/entry/' + emp_id + '/' + emtry_num;

  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`Client Side Error : ${error.message}`);
    } else {
      console.log(`Server Side Error : ${error.message}`);
      console.warn(error);
    }
    return throwError(error.message || "Server Error");
  }
}
