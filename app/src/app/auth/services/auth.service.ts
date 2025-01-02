import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  computed,
  effect,
  inject,
  Injectable,
  linkedSignal,
} from "@angular/core";
import { filter, fromEvent, map, Observable, of, tap, throwError } from "rxjs";
import { STORAGE_KEY_NAMES } from "../../../config/storage.config";
import { environment } from "../../../environments/environment";
import { AuthDto } from "../dtos/auth.dto";
import { toSignal } from "@angular/core/rxjs-interop";
import { LoginDto } from "../dtos/login.dto";
import { SignUpDto } from "../dtos/sign-up.dto";
import { NonceDto } from "../dtos/nonce.dto";
import { RefreshDto } from "../dtos/refresh.dto";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  private window = inject(DOCUMENT).defaultView!;

  private authEndpoint = `${environment.apiUrl}/auth`;

  #authDataChanges = toSignal(
    fromEvent<StorageEvent>(this.window, "storage").pipe(
      filter(({ key }) => !key || key === STORAGE_KEY_NAMES.auth),
      map(({ key, newValue }) => {
        if (!key || !newValue) {
          return null;
        }

        return JSON.parse(newValue) as AuthDto;
      }),
    ),
    {
      initialValue: JSON.parse(
        localStorage.getItem(STORAGE_KEY_NAMES.auth) ?? "null",
      ) as AuthDto,
    },
  );

  #authData = linkedSignal(() => this.#authDataChanges());

  accessToken = computed(() => this.#authData()?.accessToken ?? null);
  isAuthenticated = computed(() => this.#authData() !== null);

  constructor() {
    effect(() => {
      const authData = this.#authData();

      if (this.isSynced(authData)) {
        return;
      }

      if (!authData) {
        localStorage.removeItem(STORAGE_KEY_NAMES.auth);

        return;
      }

      localStorage.setItem(STORAGE_KEY_NAMES.auth, JSON.stringify(authData));
    });
  }

  signUp(signUpDto: SignUpDto) {
    if (this.isAuthenticated()) {
      return throwError(() => new Error());
    }

    return this.http.post<AuthDto>(`${this.authEndpoint}/register`, signUpDto)
      .pipe(
        tap((data) => void this.#authData.set(data)),
        map(() => {}),
      );
  }

  login(loginDto: LoginDto) {
    if (this.isAuthenticated()) {
      return throwError(() => new Error());
    }

    return this.http.post<AuthDto>(`${this.authEndpoint}/login`, loginDto)
      .pipe(
        tap((data) => void this.#authData.set(data)),
        map(() => {}),
      );
  }

  logout() {
    if (!this.isAuthenticated()) {
      return throwError(() => new Error());
    }

    return this.http.post<unknown>(
      `${this.authEndpoint}/logout`,
      {
        refreshToken: this.#authData()!.refreshToken,
      } satisfies RefreshDto,
    )
      .pipe(
        tap(() => void this.#authData.set(null)),
        map(() => {}),
      );
  }

  disconnect() {
    if (!this.isAuthenticated()) {
      return throwError(() => new Error());
    }

    return this.http.post<unknown>(`${this.authEndpoint}/disconnect`, null)
      .pipe(
        tap(() => void this.#authData.set(null)),
        map(() => {}),
      );
  }

  refresh() {
    if (!this.isAuthenticated()) {
      return throwError(() => new Error());
    }

    return this.http.post<AuthDto>(
      `${this.authEndpoint}/refresh`,
      {
        refreshToken: this.#authData()!.refreshToken,
      } satisfies RefreshDto,
    )
      .pipe(
        tap((data) => void this.#authData.set(data)),
        map(() => {}),
      );
  }

  nonce(): Observable<string | undefined> {
    if (!this.isAuthenticated()) {
      return of(undefined);
    }

    return this.http.post<NonceDto>(`${this.authEndpoint}/nonce`, null)
      .pipe(
        map(({ nonce }) => nonce),
      );
  }

  private isSynced(authData: AuthDto | null) {
    const storedAuthData = localStorage.getItem(STORAGE_KEY_NAMES.auth);

    if (!authData && !storedAuthData) {
      return true;
    }

    if (!authData || !storedAuthData) {
      return false;
    }

    const { refreshToken, accessToken } = JSON.parse(
      storedAuthData,
    ) as AuthDto;

    return authData.refreshToken === refreshToken &&
      authData.accessToken === accessToken;
  }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.authEndpoint}/email-exists`, {
      params: { email },
    });
  }

  usernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.authEndpoint}/username-exists`, {
      params: { username },
    });
  }
}
