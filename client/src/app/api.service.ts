import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseUrl = "http://134.122.93.152:8000"
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
    return this.http.get(this.baseUrl + '/posts', this.options)
  }
  getPostDetail(id): Observable<any> {
    return this.http.get(this.baseUrl + '/detail/' + id, this.options)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.message);
    } else {

      alert(error.message);

    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // The authenticate is the function for call the django backedn server for
  // login function
  authenticate(username: string, password: string) {
    const data = { 'username': username, 'password': password };
    return this.http.post(this.baseUrl + '/api/login/', data, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  addPost(title: string, desc: string, user: string) {
    var now = new Date();
    var formattedDate = now.toISOString().slice(0, 10); //yyyy-mm-dd
    const data = {
      'title': title, 'desc': desc, 'user': user, 'date': formattedDate
    };
    return this.http.post(this.baseUrl + '/posts/', data, this.options)
  }

}

