import { Trigger } from "./trigger";

export class Notification {
  constructor(
    public id: string,
    public createdAt: Date,
    public handled: boolean,
    public read: boolean,
    public trigger: Trigger,
  ) {}
}
