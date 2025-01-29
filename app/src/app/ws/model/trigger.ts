import { Workspace } from "../../workspace/model/workspace";

export class Trigger {
  constructor(
    public id: string,
    public type: string,
    public workSpaceId: string,
    public invitedUserId: string,
    public status: string,
    public workspace: Workspace,
    public message: string,
  ) {
  }
}
