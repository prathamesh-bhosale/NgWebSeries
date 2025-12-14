import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private httpclient: HttpClient) {
    super()
   }

   addCategory(category: Category): Observable<Category>{
     return this.httpclient.post<Category>(`${this.WEBAPIURL}/api/categories`, category)
   }

   updateCategory(category: Category): Observable<Category>{
    return this.httpclient.put<Category>(`${this.WEBAPIURL}/api/categories/${category.id}`, category)
  }

  deleteCategory(id: number): Observable<Category>{
    return this.httpclient.delete<Category>(`${this.WEBAPIURL}/api/categories/${id}`)
  }

  getCategoryById(id: number): Observable<Category>{
    return this.httpclient.get<Category>(`${this.WEBAPIURL}/api/categories/${id}`)
  }

  getAllCategories(): Observable<Category[]>{
    return this.httpclient.get<Category[]>(`${this.WEBAPIURL}/api/categories`)
  }
}
