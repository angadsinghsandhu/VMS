import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { userModel, entryModel } from '../models/models';
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from './auth.service';

const BACKEND_URL = environment.apiURL + '/empDash';

@Injectable({
  providedIn: 'root'
})

// Provide Entrys array Object
export class EntrysService {
  constructor(private userService: UserService,
    private httpClient: HttpClient,
    private authService: AuthService) { }

  //variables
  entrys: Array<entryModel> = [];

  getEntrys() {
    var user;
    this.userService.getUser()
      .subscribe(data => user = data);

    this.entrys = user.entrys;
    return this.entrys
  }

  createEntry(entry): Observable<any> {
    const CREATE_URL = BACKEND_URL + '/create';

    // adding token header
    var TokenHeader = new HttpHeaders();
    const token = 'Bearer ' + this.authService.getToken()
    TokenHeader.append('Authorization', token);

    const httpOptions: Object = {
      headers: new HttpHeaders({
        'authorization': token
      }),
      responseType: 'text'
    };

    // getting responce from http post request
    const x = this.httpClient.post<entryModel>(CREATE_URL, entry)//, httpOptions)
      .pipe(catchError(this.handleError));
    return x;
  }

  editEntry(entry, entry_num): Observable<any> {
    const EDIT_URL = BACKEND_URL + '/edit/' + entry_num;

    // getting responce from http post request
    const x = this.httpClient.put<entryModel>(EDIT_URL, entry)
      .pipe(catchError(this.handleError));
    return x;
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
