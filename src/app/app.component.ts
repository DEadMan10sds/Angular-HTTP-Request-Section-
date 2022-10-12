import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Post } from './post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit()
  {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post<{name: string}>(//Se castea para que la respuesta tenga una estructura definida
      'https://angularmaximilianhttpsection-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(
      responseData => {
        console.log(responseData);
      }
    );
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.http.get<{[key: string]: Post}>('https://angularmaximilianhttpsection-default-rtdb.firebaseio.com/posts.json') //Se puede 'castear' la respuesta para que tenga una estructura definida
    .pipe(
      map(
        (responseData) => {//Las llaves de arreglos definen un placeholder, de esta manera decimos que habrá un atributo de nombre cambiante (que llamaremos key) de tipo string
          const postsArray: Post[] = [];
          for(let key in responseData)
          {
            if(responseData.hasOwnProperty(key)) //Si el arreglo de responseData tiene una propiedad con el valor de 'key' (que es el iterador actual) hace push
              postsArray.push({...responseData[key], id: key})
          }
          return postsArray;
        }
      )
    )
    .subscribe(
      (posts: Post[]) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }
    );
  }

  onClearPosts() {
    // Send Http request
  }
}
