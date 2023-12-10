import { Post } from "./post.models";
import { User } from "./user.models";

 
export class Comment {
  id: number;
  content: string;
  dateComment: Date;
 
  user: User;

  constructor(id: number, content: string, dateComment: Date, post: Post, user: User) {
    this.id = id;
    this.content = content;
    this.dateComment = dateComment;
     this.user = user;
  }
}

