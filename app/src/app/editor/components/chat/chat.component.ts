import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
} from "@angular/core";
import { WsService } from "../../../ws/ws.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { scan } from "rxjs";

interface ChatMessage {
  id: string;
  content: string;
  user: any;
  createdAt: Date;
}

@Component({
  selector: "app-chat",
  imports: [FormsModule, CommonModule],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  private wsService = inject(WsService);

  workspace = input.required<string>();

  content = model<string>("");
  messages$ = this.wsService.fromEvent<ChatMessage>("workspace:message").pipe(
    scan<ChatMessage, ChatMessage[]>(
      (messages, message) => [...messages, message],
      [],
    ),
  );

  sendMessage() {
    if (!this.content().trim()) {
      return;
    }

    this.wsService
      .emit("workspace:message", {
        workspace: this.workspace(),
        content: this.content(),
      })
      .subscribe();

    this.content.set("");
  }
}
