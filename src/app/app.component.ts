import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  fetchError: boolean = false;
  error = null;
  private errorSub: Subscription;

  constructor(private httpService: PostService ) {}

  ngOnInit()
  {
    this.onFetchPosts();
    this.errorSub = this.httpService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

  onCreatePost(postData: Post)
  {
    this.httpService.createPost(postData);
  }

  onFetchPosts() {
    //La suscripción se hace en el componente si este requiere la información, si no, se puede hacer en el servicio
    this.isFetching = true;
    this.httpService.fetchPost().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.fetchError = true;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    this.httpService.clearAllPosts().subscribe();
    this.loadedPosts = [];
  }

  handleError()
  {
    this.error = null;
    this.isFetching = false;
  }

}
