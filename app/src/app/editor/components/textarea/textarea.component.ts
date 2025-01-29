import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { WorkspaceItem } from "../../../workspace/model/workspace-item";
import { WsService } from "../../../ws/ws.service";
import { interval, switchMap, throttle } from "rxjs";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-textarea",
  imports: [FormsModule],
  templateUrl: "./textarea.component.html",
  styleUrl: "./textarea.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  wsService = inject(WsService);

  note = input.required<WorkspaceItem>();
  content = model("");

  constructor() {
    this.wsService.fromEvent<WorkspaceItem>("note:update").pipe(
      takeUntilDestroyed(),
    )
      .subscribe(
        ({ id, content }) => {
          if (this.note().id !== id) {
            return;
          }

          this.content.set(content);
        },
      );

    effect((onCleanup) => {
      const note = this.note();

      this.content.set(note.content);

      this.wsService.emitWithAck<WorkspaceItem>("note:open", {
        note: this.note().id,
      }).subscribe(
        ({ content }) => {
          this.content.set(content);
        },
      );

      onCleanup(() => {
        note.content = this.content();

        this.wsService.emit("note:close", { note: this.note().id })
          .subscribe();
      });
    });

    toObservable(this.content).pipe(
      throttle(() => interval(400), { leading: true, trailing: true }),
      switchMap((content) => {
        return this.wsService.emit("note:update", {
          note: this.note().id,
          content: content,
        });
      }),
    ).subscribe();
  }
}
