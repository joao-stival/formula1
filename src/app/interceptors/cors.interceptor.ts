import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Adiciona headers necessários para CORS
    const clonedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(clonedRequest);
  }
}
