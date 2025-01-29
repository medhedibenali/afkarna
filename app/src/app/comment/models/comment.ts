import { User } from '../../users/models/user';

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  workspaceItemId: string;
  replies?: [];
}

export type NewComment = Omit<
  Comment,
  'id' | 'createdAt' | 'updatedAt' | 'user' | 'replies'
>;
