import { CanMatchFn } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const isNotAuthenticatedCanMatchGuard: CanMatchFn = (
  _route,
  _segments,
) => {
  const authService = inject(AuthService);

  return !authService.isAuthenticated();
};
