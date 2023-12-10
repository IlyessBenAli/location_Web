import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.models';
import { ForumService } from '../../services/forum.service';
 

@Component({
  selector: 'add_posts',
  templateUrl: './add_posts.component.html',
  styleUrls: ['./add_posts.component.scss']
})
export class AddPostComponent implements OnInit {
    addForm: FormGroup;
    selectedFile: File;
    showAlert: boolean = false;
    isSuccess: boolean;
    alertMessage: string;
  
    constructor(private formBuilder: FormBuilder, private forumService: ForumService) {}
  
    ngOnInit() {
      this.addForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
  
    savePost() {
      if (this.addForm.invalid) {
        return;
      }
  
      const newPost: Post = {
        id: null,
        title: this.addForm.value.title,
        description: this.addForm.value.description,
        datePub: new Date(),
        image: '',
        liked: false,
        likes: 0,
        user: null,
        showComments :false,
        newComment : '',
        comments: []
      };
  
      if (this.selectedFile) {
        this.convertFileToBase64(this.selectedFile).then((base64: string) => {
          newPost.image = base64;
          this.createPost(newPost);
        });
      } else {
        this.createPost(newPost);
      }
    }
  
    convertFileToBase64(file: File): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const base64 = base64String.split(",")[1];
          resolve(base64);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    }
  
    createPost(newPost: Post) {
      this.forumService.createPost(newPost).subscribe(
        (response: Post) => {
          this.showAlert = true;
          this.isSuccess = true;
          this.alertMessage = 'Post created successfully.';
          this.addForm.reset();
        },
        (error) => {
          this.showAlert = true;
          this.isSuccess = false;
          this.alertMessage = 'Error creating post.';
        }
      );
    }
}