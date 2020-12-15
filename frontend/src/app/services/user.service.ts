import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.BASE_URL;
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<User>(
        this.baseUrl + '/login',
        { username: email, password },
        { withCredentials: true }
      )
      .pipe(catchError(this.handleError));
  }

  validateIsAuthenticated() {
    return this.httpClient
      .get(this.baseUrl + '/authenticated', {
        withCredentials: true,
        observe: 'response',
      })
      .toPromise();
  }

  getUserById(id: string): Promise<User> {
    return this.httpClient
      .get<User>(this.baseUrl + `/users/${id}`)
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  registerUser(data: FormData) {
    return this.httpClient
      .post(this.baseUrl + '/users', data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    const msgError =
      err.error.msgError || err.statusText || 'Error internal server';
    console.error(
      `Error occurred, message - > ${msgError}, status code -> ${err.status}`
    );
    return throwError(msgError);
  }
}
