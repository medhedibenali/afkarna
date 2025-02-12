import { CanActivateChildFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const isAuthenticatedCanActivateChildGuard: CanActivateChildFn = (
  _childRoute,
  _state,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(["/auth/login"]);

  return false;
};
