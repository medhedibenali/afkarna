import { Component, model } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-textarea",
  imports: [FormsModule],
  templateUrl: "./textarea.component.html",
  styleUrl: "./textarea.component.css",
})
export class TextareaComponent {
  contents = model<string>("");
}
