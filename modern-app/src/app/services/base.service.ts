import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public WEBAPIURL = "http://localhost:65492/"

  constructor() { }

  getAbsolutePath(relative: string): string{
    if (relative && (relative.startsWith('http') || relative.startsWith('https'))) {
      return relative;
    }
    if (relative && (relative.startsWith('assets') || relative.startsWith('/assets'))) {
      return relative;
    }
    return this.WEBAPIURL + relative;
    //http://localhost:65492/upload/ddlj.jpg
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => error)
  }

}
