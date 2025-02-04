import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: "app-chat",
  imports: [FormsModule, CommonModule],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  private chatService = inject(ChatService);

  content = model<string>("");
  messages$ = this.chatService.messages$;

  send() {
    this.chatService.sendMessage(this.content());
    this.content.set("");
  }
}
