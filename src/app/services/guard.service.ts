import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { userModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private httpClient: HttpClient) { }

  checkAll(today): Observable<any> {
    const DASH_URL = environment.apiURL + '/guardDash';
    return this.httpClient.put(DASH_URL, { date: today })
      .pipe(catchError(this.handleError));
  }

  onEntry(data): Observable<any> {
    const EDIT_URL = environment.apiURL + '/guardDash/entry';

    // getting responce from http post request
    const x = this.httpClient.put<userModel>(EDIT_URL, data)
      .pipe(catchError(this.handleError));
    return x;
  }

  onExit(exit, emp_id, entry_num): Observable<any> {
    const EXIT_URL = environment.apiURL.toString() + "/guardDash/exit/" + emp_id + '/' + entry_num;

    const exit_time = {
      "exit_time": exit
    }

    // getting responce from http post request
    return this.httpClient.put<any>(EXIT_URL, exit_time)
      .pipe(catchError(this.handleError));
  }

  createImage(formData: FormData, emp_id, entry_num): Observable<any> {
    const IMG_URL = environment.apiURL + '/guardDash/entry/image/' + emp_id + '/' + entry_num;

    // getting responce from http post request
    const x = this.httpClient.post<any>(IMG_URL, formData)
      .pipe(catchError(this.handleError));
    return x;
  }

  getImagePath(imgName) {
    return (environment.apiURL + '/guardDash/entry/image/' + imgName);
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
