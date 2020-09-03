//feature provided by the angular HTTPS Client
//we use it here to add tokens to headers in out going requests

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();

        if (authToken) {
            const clone = req.clone({
                headers: req.headers.set("authorization", "Bearer " + authToken)
            });
            return next.handle(clone);
        } else {
            return next.handle(req);
        }
    }
}   