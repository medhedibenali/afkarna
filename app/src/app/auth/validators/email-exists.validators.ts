import { AsyncValidatorFn } from "@angular/forms";
import { catchError, map, of, switchMap, timer } from "rxjs";
import { AuthService } from "../auth.service";

export function emailExistsValidator(
  authService: AuthService,
): AsyncValidatorFn {
  return (control) => {
    return timer(400).pipe(
      switchMap(() => authService.emailExists(control.value)),
      map((exists) => (exists ? { emailExists: true } : null)),
      catchError(() => of(null)),
    );
  };
}
