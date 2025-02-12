import { CanActivateChildFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const isNotAuthenticatedCanActivateChildGuard: CanActivateChildFn = (
  _childRoute,
  _state,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  router.navigate(["/"]);

  return false;
};
