import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public WEBAPIURL = "http://localhost:65492/"

  constructor() { }

  //relative => upload/ddlj.jpg
  getAbsolutePath(relative: string): string{
    return this.WEBAPIURL + relative;
    //http://localhost:65492/upload/ddlj.jpg
  }

  handlError(error: HttpErrorResponse){
    return throwError(error)
  }

}
