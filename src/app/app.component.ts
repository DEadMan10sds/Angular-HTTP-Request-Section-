import { Component, OnInit } from '@angular/core';
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

  constructor(private httpService: PostService ) {}

  ngOnInit()
  {
    this.onFetchPosts();
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
        this.loadedPosts = posts
      }
    );
  }

  onClearPosts() {
    // Send Http request
  }
}
