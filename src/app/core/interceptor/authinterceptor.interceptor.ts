import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpHeader } from './model/auth.model';
import { Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { jwtHelper } from '../guard/auth.guard';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {
  constructor(
    private route: Router,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers && request.headers.has(HttpHeader.SKIP_INTERCEPTOR)) {
      return next.handle(request);
    }
    let token: string = localStorage.getItem('token') as string;

    token = token ? JSON.parse(token) : '';
    if (token && jwtHelper.isTokenExpired(token)) {
      localStorage.clear();
      this.route.navigate(['/login']);
    }
    let clone = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(clone).pipe(
      catchError((e: HttpErrorResponse) => {
        if (!e.status) {
          this.notificationService.openSnackBar(
            'Something went wrong, please try again later'
          );

          return throwError(() => e);
        }
        if (e.status == 401) {
          localStorage.clear();
          this.route.navigate(['/login']);
        }
        return throwError(() => e);
      })
    );
  }
}
