import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = this.auth.getUser();
    if (user && user.idToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.idToken}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}