import { Component, OnInit } from '@angular/core';
import { ForumService } from './services/forum.service';
import { Post } from './models/post.models';
import { Comment } from './models/comment.models';
enum SortBy {
  NewestPosts = 'newest',
  OldestPosts = 'oldest',
  MostLikes = 'most-likes',
   MostComments = 'most-comments'
}
@Component({
  selector: 'app-bs-component',
  templateUrl: './bs-component.component.html',
  styleUrls: ['./bs-component.component.scss']
})
 

// Declare a property to hold the selected sort option

export class BsComponentComponent implements OnInit {
 
  constructor(private forumService: ForumService) {}
  posts: Post[];
  loading: boolean = false; // Define the 'loading' property and set its initial value
  hasError: boolean = false; // Define the 'hasError' property and set its initial value
   // Define the 'hasError' property and set its initial value
   selectedSortOption: string;


  
  ngOnInit() {
    this.getPosts();
  

  }
 
  
  getPosts() {
    this.forumService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts.map(post => ({
          ...post,
          datePub: new Date(post.datePub) // Convert string to Date
        }));
        //this.sortPosts(); // Appel à sortPosts() sans paramètre
      },
      (error) => {
        console.error('Error getting posts:', error);
      }
    );
  }
  sortPosts(event) {
    console.log('event', event)
    switch (event) {
      case SortBy.NewestPosts:
        this.posts.sort((a, b) => b.datePub.getTime() - a.datePub.getTime());
        break;
      case SortBy.OldestPosts:
        this.posts.sort((a, b) => a.datePub.getTime() - b.datePub.getTime());
        break;
      case SortBy.MostLikes:
        this.posts.sort((a, b) => b.likes - a.likes);
        break;
      case SortBy.MostComments:
        this.posts.sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        // Default sorting option (newest)
        this.posts.sort((a, b) => b.datePub.getTime() - a.datePub.getTime());
        break;
    }
  }
  

  likePost(post: Post) {
    post.likes++; // Increment the likes locally before the API call
  
    this.forumService.updateLikes(post.id, post.likes).subscribe(
      (updatedPost: Post) => {
        console.log('Likes updated:', updatedPost);
        // Optionally, you can update the local post with the updated data
        post = updatedPost;
      },
      (error) => {
        console.error('Error updating likes:', error);
        // Revert the local likes value in case of error
        post.likes--;
      }
    );
  }
  
  newComment: string;

  toggleComments(post: Post) {
  post.showComments = !post.showComments;
}

  addComment(post: Post) {
    const newComment: Comment = {
      id:0,
      content: post.newComment,
       dateComment: new Date(),
      user: null,
    };this.forumService.addComment(newComment, post.id).subscribe(
      (response) => {
        console.log(post.id);
        console.log('Comment 1:', newComment);
        console.log('Comment added:', response);
    
        if (post && post.comments) {
          post.comments.push(response); // Add the comment to the comments array
        }
    
        post.newComment = ''; // Clear the input field after adding the comment
        alert('Comment added successfully'); // Display a success alert
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
 
    }
}
