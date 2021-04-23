import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Series } from '../models/series';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends BaseService {

  constructor(private httpclient: HttpClient) {
    super()
   }

   addSeries(series: FormData): Observable<Series>{
     return this.httpclient.post<Series>(`${this.WEBAPIURL}/api/series`, series)
   }


  deleteSeries(id: number): Observable<Series>{
    return this.httpclient.delete<Series>(`${this.WEBAPIURL}/api/series/${id}`)
  }

  getSeriesById(id: number): Observable<Series>{
    return this.httpclient.get<Series>(`${this.WEBAPIURL}/api/series/${id}`)
  }

  getAllSeriess(): Observable<Series[]>{
    return this.httpclient.get<Series[]>(`${this.WEBAPIURL}/api/series`)
  }
}

