import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Post } from "../post.model";

@Injectable({
  providedIn: 'root' //Se establece que se provee en el app.module.ts, así no se satura ese archivo con los providers
})
export class PostService
{

  error = new Subject<Error>();

  constructor(private http: HttpClient){}

  createPost(newPost: Post){
    //La suscripción se puede hacer en el servicio si el componente no necesita la respuesta de la solicitud en un inicio
    this.http.post<{name: string}>(//Se castea para que la respuesta tenga una estructura definida
    'https://angularmaximilianhttpsection-default-rtdb.firebaseio.com/posts.json',
    newPost
    ).subscribe(
      responseData => {
        console.log(responseData);
      },
      error => {
        this.error.next(error.message);
      }
    );
    this.fetchPost();
  }

  fetchPost()
  {
    return this.http.get<{[key: string]: Post}>('https://angularmaximilianhttpsection-default-rtdb.firebaseio.com/posts.json') //Se puede 'castear' la respuesta para que tenga una estructura definida
    .pipe(
      map(
        (responseData) => {//Las llaves de arreglos definen un placeholder, de esta manera decimos que habrá un atributo de nombre cambiante (que llamaremos key) de tipo string
          const postsArray: Post[] = [];
          for(let key in responseData)
          {
            if(responseData.hasOwnProperty(key)) //Si el arreglo de responseData tiene una propiedad con el valor de 'key' (que es el iterador actual) hace push
              postsArray.push({...responseData[key], id: key})
          }
          //console.log(postsArray);
          return postsArray;

          //return this.postChanges.next(this.APIpostsArray.slice());
        }
      ),
      catchError(
        errorRes => {
          return throwError(errorRes);
        }
      ),
    );

    //return this.newArrayPost.slice();
  }


  clearAllPosts()
  {
    return this.http.delete('https://angularmaximilianhttpsection-default-rtdb.firebaseio.com/posts.json');
  }

}
