import { Language } from './../models/language';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService  extends BaseService {

  private httpclient = inject(HttpClient);

   addLanguage(language: Language): Observable<Language>{
     return this.httpclient.post<Language>(`${this.WEBAPIURL}/api/languages`, language)
   }

   updateLanguage(language: Language): Observable<Language>{
    return this.httpclient.put<Language>(`${this.WEBAPIURL}/api/languages/${language.id}`, language)
  }

  deleteLanguage(id: number): Observable<Language>{
    return this.httpclient.delete<Language>(`${this.WEBAPIURL}/api/languages/${id}`)
  }

  getLanguageById(id: number): Observable<Language>{
    return this.httpclient.get<Language>(`${this.WEBAPIURL}/api/languages/${id}`)
  }

  getAllLanguages(): Observable<Language[]>{
    return this.httpclient.get<Language[]>(`${this.WEBAPIURL}/api/languages`)
  }
}
