import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";

export function userNameExistsValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      switchMap(userName => authService.userNameExists(userName)),
      map((exists) => (exists ? { userNameExists: true } : null)),
      catchError(() => of(null))
    );
  };
}