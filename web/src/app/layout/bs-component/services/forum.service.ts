import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.models';
import { Comment } from '../models/comment.models';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:8082/house/api'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }
  updateLikes(postId: number, likes: number): Observable<Post> {
    const updateUrl = `${this.apiUrl}/posts/likes/${postId}/`+likes;
    return this.http.put<Post>(updateUrl, { likes });
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments`);
  }
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }
  addComment(comment: Comment,idpst:number): Observable<Comment> {
    console.log('adddd',comment);
    const url = `${this.apiUrl}/comments/`+idpst;
    console.log('verifeer',comment);

    return this.http.post<Comment>(url, comment);
  }
  

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, post);
  }

  // Add more methods as needed for updating comments, users, etc.
}
