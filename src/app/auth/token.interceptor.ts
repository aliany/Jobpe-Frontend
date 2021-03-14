import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers: HttpHeaders;
    if (this.auth.getAccessToken() !== null) {
      headers = new HttpHeaders({
        Authorization: `Bearer ${this.auth.getAccessToken()}`
      });
    }

    request = request.clone({
      withCredentials: true,
      headers
    });

    return next.handle(request);
  }
}
