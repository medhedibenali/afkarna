import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.set("Authorization", authService.accessToken()!),
  });

  return next(newReq);
};
