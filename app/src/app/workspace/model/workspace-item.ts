import { Workspace } from "./workspace";

export class WorkspaceItem {
  constructor(
    public id: string | "",
    public name: string,
    public type: string,
    public content: string,
    public parent: WorkspaceItem | null = null,
    public children: WorkspaceItem[] = [],
    public workspace: Workspace | null = null,
    public createdAt: Date,
    public show: boolean = false,
  ) {}


}
