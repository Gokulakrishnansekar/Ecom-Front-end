import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clone = request.clone({
      setHeaders: {
        Authorization: 'Basic Z29rdWw6YWJp',
        Cookie: 'JSESSIONID=D3BE0FD3BDB315DCB0AF1CEE1C9432D9',
      },
    });
    console.log('intercepted', clone.headers);
    return next.handle(clone);
  }
}
