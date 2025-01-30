import { effect, inject, Injectable, untracked } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";
import {
  defer,
  filter,
  map,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  take,
  tap,
} from "rxjs";
import { io, Socket } from "socket.io-client";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class WsService {
  private authService = inject(AuthService);

  #socket$ = new ReplaySubject<Socket>(1);
  #events$ = new Subject<{ event: string; data: unknown }>();

  constructor() {
    effect((onCleanup) => {
      let socket: Socket | null = null;

      onCleanup(() => {
        socket?.close();
      });

      if (!this.authService.isAuthenticated()) {
        socket = io(environment.wsUrl);
        return void this.#socket$.next(socket);
      }

      untracked(() => {
        this.authService.nonce().subscribe((nonce) => {
          socket = io(environment.wsUrl, { auth: { token: nonce } });
          this.#socket$.next(socket);
        });
      });
    });

    this.#socket$.subscribe((socket) => {
      socket.onAny((event, data) => {
        this.#events$.next({ event, data });
      });
    });
  }

  fromEvent<T = unknown>(event: string) {
    return this.#events$.pipe(
      filter(({ event: eventName }) => eventName === event),
      map(({ data }) => data as T),
    );
  }

  emit(event: string, data: unknown) {
    return this.#socket$.pipe(
      take(1),
      tap((socket) => socket.emit(event, data)),
      map(() => {}),
    );
  }

  emitWithAck<T = unknown>(event: string, data: unknown): Observable<T> {
    return this.#socket$.pipe(
      take(1),
      switchMap((socket) => defer(() => socket.emitWithAck(event, data))),
    );
  }
}
