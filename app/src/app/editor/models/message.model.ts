import { User } from "../../users/models/user.model";

export interface Message {
  id: string;
  content: string;
  user: User;
  createdAt: Date;
}
