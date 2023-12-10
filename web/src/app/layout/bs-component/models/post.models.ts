import { User } from "./user.models";
import { Comment } from './comment.models';

 

export class Post {
  id: number;
  title:string;
  description: string;
  datePub: Date;
  image: string;
  liked: boolean;
  likes: number;
  user: User;
  comments: Comment[];
  showComments: boolean; // Add this property
  newComment: string;
  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.datePub = new Date();
    this.image = '';
    this.liked = false;
    this.likes = 0;
    this.user = null;
    this.comments = [];
    this.showComments = false;
    this.newComment = '';
  }
}
