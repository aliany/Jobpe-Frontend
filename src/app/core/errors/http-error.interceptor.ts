import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private modalService: ModalService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error from error interceptor', error);
        this.modalService.show();
        return throwError(error);
      }),
      finalize(() => {
      })
    ) as Observable<HttpEvent<any>>;
  }
}
