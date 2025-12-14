import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService extends BaseService {

  constructor(private httpclient: HttpClient) {
    super()
   }

   addEpisode(episode: FormData): Observable<Episode>{
     return this.httpclient.post<Episode>(`${this.WEBAPIURL}/api/episodes`, episode)
   }


  deleteEpisode(id: number): Observable<Episode>{
    return this.httpclient.delete<Episode>(`${this.WEBAPIURL}/api/episodes/${id}`)
  }

  getEpisodeById(id: number): Observable<Episode>{
    return this.httpclient.get<Episode>(`${this.WEBAPIURL}/api/episodes/${id}`)
  }

  getAllEpisodesBySeriesId(seriesid: number): Observable<Episode[]>{
    return this.httpclient.get<Episode[]>(`${this.WEBAPIURL}/api/episodes/getepisodesbyseriesid?seriesid=${seriesid}`)
  }

  getEpisodesCountForSeriesId(seriesid: number): Observable<number>{
    return this.httpclient.get<number>(`${this.WEBAPIURL}/api/episodes/getepisodescountforseriesid?seriesid=${seriesid}`)
  }

  incrView(episodeid: number): Observable<number>{
    return this.httpclient.put<number>(`${this.WEBAPIURL}/api/episodes/incrviews?id=${episodeid}`, {})
  }
}

