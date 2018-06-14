import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs/Subject';
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

  login(formInfo: {username: string, password: string}) {
    const body = JSON.stringify(formInfo);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/user/login', body, {headers: headers})
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: Response) => throwError(error.json()))
      )
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setLoginObservableValue(false, '');
  }

  isLoggedIn() {
      return localStorage.getItem('token') !== null;
  }

  getLoginObservable() {
    return this.subject.asObservable();
  }

  setLoginObservableValue(loggedIn: boolean, username: string) {
    this.subject.next({isLoggedIn: loggedIn, username: username});
  }

  username() {
    return localStorage.getItem('username');
  }

  getUserPage() {


  }

}
