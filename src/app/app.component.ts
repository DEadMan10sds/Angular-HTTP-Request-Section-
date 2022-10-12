import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit()
  {
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(
      'https://angularmaximilianhttpsection-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(
      responseData => {
        console.log(responseData);
      }
    );
    console.log(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.http.get('https://angularmaximilianhttpsection-default-rtdb.firebaseio.com/posts.json').subscribe(
      posts => {
        console.log(posts)
      }
    );
  }

  onClearPosts() {
    // Send Http request
  }
}
