import { inject, Injectable, signal } from "@angular/core";
import { WsService } from "../../ws/ws.service";
import { Message } from "../models/message.model";
import { map, merge, scan, shareReplay } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private wsService = inject(WsService);

  workspace = signal<string | null>(null);
  messages$ = merge(
    toObservable(this.workspace).pipe(map(() => () => [])),
    this.wsService.fromEvent<Message>("workspace:message").pipe(
      map((message) => (messages: Message[]) => [...messages, message]),
    ),
  ).pipe(
    scan<(messages: Message[]) => Message[], Message[]>(
      (messages, innerFn) => innerFn(messages),
      [],
    ),
    shareReplay(1),
  );

  sendMessage(content: string) {
    if (this.workspace() === null) {
      return;
    }

    content = content.trim();

    if (!content) {
      return;
    }

    this.wsService
      .emit("workspace:message", {
        workspace: this.workspace(),
        content,
      })
      .subscribe();
  }
}
