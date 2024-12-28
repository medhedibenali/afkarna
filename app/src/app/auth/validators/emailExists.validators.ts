import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Observable, of, timer } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

export function emailExistsValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(400).pipe(
      switchMap(() => authService.emailExists(control.value)),
      map((exists) => (exists ? { emailExists: true } : null)),
      catchError(() => of(null))
    );
  };
}