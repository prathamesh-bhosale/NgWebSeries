import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BaseService } from './base.service';

import {catchError} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private httpclient: HttpClient) {
    super()
   }

   register(user: User): Observable<User>{
    return this.httpclient.post<User>(`${this.WEBAPIURL}/api/users`, user)
    .pipe(catchError(this.handlError))
   }

   login(user: User): Observable<User>{
    return this.httpclient.post<User>(`${this.WEBAPIURL}/api/users/checklogin`, user)
    .pipe(catchError(this.handlError))
   }

   forgetPassword(user: User): Observable<string>{
    return this.httpclient.post<string>(`${this.WEBAPIURL}/api/users/forget`, user)
    .pipe(catchError(this.handlError))
   }
}
