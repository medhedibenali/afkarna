import { AsyncValidatorFn } from "@angular/forms";
import { catchError, map, of, switchMap, timer } from "rxjs";
import { AuthService } from "../services/auth.service";

export function usernameExistsValidator(
  authService: AuthService,
): AsyncValidatorFn {
  return (control) => {
    return timer(400).pipe(
      switchMap(() => authService.usernameExists(control.value)),
      map((exists) => (exists ? { usernameExists: true } : null)),
      catchError(() => of(null)),
    );
  };
}
