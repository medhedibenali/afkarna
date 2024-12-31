import { WorkspaceItem } from "./workspace-item";

export class Workspace {
    constructor(
        public id: string,
        public name: string,
        public createdAt: Date,
        public collection: WorkspaceItem
    ) { }
}