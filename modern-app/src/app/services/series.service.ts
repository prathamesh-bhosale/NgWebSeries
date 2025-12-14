import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Series } from '../models/series';
import { TMDB_CONFIG } from '../common/config/tmdb.config';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends BaseService {

  private httpclient = inject(HttpClient);

   addSeries(series: FormData): Observable<Series>{
     return this.httpclient.post<Series>(`${this.WEBAPIURL}/api/series`, series)
   }


  deleteSeries(id: number): Observable<Series>{
    return this.httpclient.delete<Series>(`${this.WEBAPIURL}/api/series/${id}`)
  }

  getSeriesById(id: number): Observable<Series>{
     return this.httpclient.get<any>(`${TMDB_CONFIG.baseUrl}/tv/${id}?api_key=${TMDB_CONFIG.apiKey}&language=en-US`).pipe(
      map(data => ({
          id: data.id,
          name: data.name,
          categories: data.genres ? data.genres.map((g: any) => g.name).join(', ') : '',
          language: data.original_language,
          releaseddate: data.first_air_date,
          story: data.overview,
          forkid: "1",
          imageurl: data.poster_path ? `${TMDB_CONFIG.imageBaseUrl}${data.poster_path}` : 'assets/images/movies/upcoming-item-1.jpg',
          videourl: "",
          count: data.number_of_episodes
      }))
    );
  }

  getAllSeriess(): Observable<Series[]>{
    return this.httpclient.get<any>(`${TMDB_CONFIG.baseUrl}/tv/popular?api_key=${TMDB_CONFIG.apiKey}&language=en-US&page=1`).pipe(
      map(response => response.results.map((data: any) => ({
          id: data.id,
          name: data.name,
          categories: "General",
          language: data.original_language,
          releaseddate: data.first_air_date,
          story: data.overview,
          forkid: "1",
          imageurl: data.poster_path ? `${TMDB_CONFIG.imageBaseUrl}${data.poster_path}` : 'assets/images/movies/upcoming-item-1.jpg',
          videourl: "", 
          count: 0
      })))
    );
  }
}
