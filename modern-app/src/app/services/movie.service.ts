import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../models/movie';
import { TMDB_CONFIG } from '../common/config/tmdb.config';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService  extends BaseService {

  private httpclient = inject(HttpClient);

   addMovie(movie: FormData): Observable<Movie>{
     return this.httpclient.post<Movie>(`${this.WEBAPIURL}/api/movies`, movie)
   }


  deleteMovie(id: number): Observable<Movie>{
    return this.httpclient.delete<Movie>(`${this.WEBAPIURL}/api/movies/${id}`)
  }

  getMovieById(id: number): Observable<Movie>{
    return this.httpclient.get<any>(`${TMDB_CONFIG.baseUrl}/movie/${id}?api_key=${TMDB_CONFIG.apiKey}&language=en-US`).pipe(
      map(data => ({
          id: data.id,
          name: data.title,
          categories: data.genres ? data.genres.map((g: any) => g.name).join(', ') : '',
          language: data.original_language,
          releaseddate: data.release_date,
          story: data.overview,
          forkid: "1",
          imageurl: data.poster_path ? `${TMDB_CONFIG.imageBaseUrl}${data.poster_path}` : 'assets/images/movies/upcoming-item-1.jpg',
          videourl: "", 
          views: Math.floor(data.popularity * 100),
          duration: `${data.runtime}m`
      }))
    );
  }

  getAllMovies(): Observable<Movie[]>{
    return this.httpclient.get<any>(`${TMDB_CONFIG.baseUrl}/movie/popular?api_key=${TMDB_CONFIG.apiKey}&language=en-US&page=1`).pipe(
      map(response => response.results.map((data: any) => ({
          id: data.id,
          name: data.title,
          categories: "General", // Generes are ids in list api
          language: data.original_language,
          releaseddate: data.release_date,
          story: data.overview,
          forkid: "1",
          imageurl: data.poster_path ? `${TMDB_CONFIG.imageBaseUrl}${data.poster_path}` : 'assets/images/movies/upcoming-item-1.jpg',
          videourl: "",
          views: Math.floor(data.popularity * 100),
          duration: ""
      })))
    );
  }
}
