import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { BaseService } from './base.service';

import {catchError} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private httpclient = inject(HttpClient);

   register(user: User): Observable<User>{
    return this.httpclient.post<User>(`${this.WEBAPIURL}/api/users`, user)
    .pipe(catchError((err) => this.handleError(err)))
   }

   login(user: User): Observable<User>{
     // Hardcoded users for testing
     // Check against name or emailid since login form binds to name
     if ((user.name === 'admin@test.com' || user.name === 'Admin' || user.emailid === 'admin@test.com') && user.password === 'admin') {
       return of(new User(1, 'Admin', 'admin', 'admin@test.com', 'admin'));
     }
     if ((user.name === 'user@test.com' || user.name === 'Test User' || user.emailid === 'user@test.com') && user.password === 'user') {
       return of(new User(2, 'Test User', 'user', 'user@test.com', 'user'));
     }

    return this.httpclient.post<User>(`${this.WEBAPIURL}/api/users/checklogin`, user)
    .pipe(catchError((err) => this.handleError(err)))
   }

   forgetPassword(user: User): Observable<string>{
    return this.httpclient.post<string>(`${this.WEBAPIURL}/api/users/forget`, user)
    .pipe(catchError((err) => this.handleError(err)))
   }
}
