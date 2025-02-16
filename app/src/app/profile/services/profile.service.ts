import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";
import { User } from "../../users/models/user.model";
import { toObservable } from "@angular/core/rxjs-interop";
import { AuthService } from "../../auth/services/auth.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private profileEndpoint = `${environment.apiUrl}/profile`;

  profile$: Observable<User | null> = toObservable(
    this.authService.isAuthenticated,
  ).pipe(
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        return of(null);
      }

      return this.http.get<User>(this.profileEndpoint);
    }),
  );
}
