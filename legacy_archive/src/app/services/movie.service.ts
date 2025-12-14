import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService  extends BaseService {

  constructor(private httpclient: HttpClient) {
    super()
   }

   addMovie(movie: FormData): Observable<Movie>{
     return this.httpclient.post<Movie>(`${this.WEBAPIURL}/api/movies`, movie)
   }


  deleteMovie(id: number): Observable<Movie>{
    return this.httpclient.delete<Movie>(`${this.WEBAPIURL}/api/movies/${id}`)
  }

  getMovieById(id: number): Observable<Movie>{
    return this.httpclient.get<Movie>(`${this.WEBAPIURL}/api/movies/${id}`)
  }

  getAllMovies(): Observable<Movie[]>{
    return this.httpclient.get<Movie[]>(`${this.WEBAPIURL}/api/movies`)
  }
}

