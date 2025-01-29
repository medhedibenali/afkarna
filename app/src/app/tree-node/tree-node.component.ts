import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";
import { WorkspaceItem } from "../workspace/model/workspace-item";
import { WorkspaceItemService } from "../workspace/service/workspace-item.service";

@Component({
  selector: "app-tree-node",
  imports: [CommonModule],
  templateUrl: "./tree-node.component.html",
  styleUrl: "./tree-node.component.css",
})
export class TreeNodeComponent implements OnInit {
  node = input.required<WorkspaceItem>();

  children!: WritableSignal<WorkspaceItem[] | null>;

  type!: Signal<string>;
  name!: Signal<string>;

  show!: WritableSignal<boolean>;

  stack: WorkspaceItem[] = sessionStorage.getItem("workspacesState")
    ? JSON.parse(sessionStorage.getItem("workspacesState")!).navigationStack
    : [];

  private workspaceItemService = inject(WorkspaceItemService);
  private selectedNodeSignal = this.workspaceItemService.selectedNodeSignal;

  ngOnInit() {
    this.children = signal<WorkspaceItem[] | null>(
      this.node().children ?? null,
    );

    this.type = computed(() => this.node().type);
    this.name = computed(() => this.node().name);

    this.show = linkedSignal(() => this.node().show);

    const stack = this.stack.map((item) => item.id);
    const node = this.node();

    if (stack.includes(node.id)) {
      if (this.children()) {
        return void this.show.update((value) => !value);
      }

      this.workspaceItemService
        .getWorkspaceItemsByParentId(node.id)
        .subscribe((collection) => {
          this.children.set(collection);
          this.show.update((value) => !value);
        });
    }
  }

  toggleFolder(): void {
    if (this.node().type === "note") {
      return void this.selectedNodeSignal.set(this.node());
    }

    if (this.children()) {
      return void this.show.update((value) => !value);
    }

    this.workspaceItemService
      .getWorkspaceItemsByParentId(this.node().id)
      .subscribe((collections) => {
        this.children.set(collections);
        this.show.update((value) => !value);
      });
  }
}
