import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class LoginSignupService {
  private subject = new Subject<any>();

  constructor(private http: Http) {}
  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: Response) => throwError(error.json()))
      );
  }

  login(formInfo: {username: string, password: string}, token?: string) {
    const body = JSON.stringify(formInfo);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    let paramToken = token ? '?token=' + token : '';
    return this.http.post('http://localhost:3000/user/login' + paramToken, body, {headers: headers})
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: Response) => throwError(error.json()))
      )
  }

  forgotPassword(username: string) {
    const body = JSON.stringify(username);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.patch('http://localhost:3000/user/login', body, {headers: headers})
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: Response) => throwError(error.json()))
      )
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setLoginObservableValue(false, '', '');
  }

  isLoggedIn() {
      return localStorage.getItem('token') !== null;
  }

  getLoginObservable() {
    return this.subject.asObservable();
  }

  setLoginObservableValue(loggedIn: boolean, username: string, userId: string) {
    this.subject.next({isLoggedIn: loggedIn, username: username, userId: userId});
  }

  username() {
    return localStorage.getItem('username');
  }

  getUserPage(userId: string) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/user/' + userId + token)
      .pipe(
        map((response: Response) => {
          const result = response.json();
        }),
        catchError((error: Response) => throwError(error.json()))
      );
  }

  changeUserData(userId: string, oldPassword?: string, newPassword?: string) {
    const body = JSON.stringify({oldPassword: oldPassword, newPassword: newPassword});
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.patch('http://localhost:3000/user/' + userId + token, body, {headers: headers})
      .pipe(
        map((response: Response) => {
          const result = response.json();
        }),
        catchError((error: Response) => throwError(error.json()))
      );
  }

}
