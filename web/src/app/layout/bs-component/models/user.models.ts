import { Post } from "./post.models";
import { Comment } from './comment.models';

 

export class User {
  id: number;
  nom: string;
  email: string;
  numTel: string;
  address: string;
  comments: Comment[];
  posts: Post[];
}
