import { Series } from './../../models/series';
import { SeriesService } from './../../services/series.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EpisodeService } from 'src/app/services/episode.service';
import { Episode } from 'src/app/models/episode';

import * as moment from 'moment';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css']
})
export class EpisodesListComponent implements OnInit {

  seriesId: number = null;
  seriesName: string = null;

  episodeList: Episode[] = []

  constructor(private activatedRoute: ActivatedRoute,
    private seriesService: SeriesService,
    private episodeService: EpisodeService) {
      this.seriesId = activatedRoute.snapshot.params["seriesid"];
     }

  ngOnInit(): void {
    this.seriesService.getSeriesById(this.seriesId).subscribe(
      (series) => {
        this.seriesName = series.name
      }
    )

    this.episodeService.getAllEpisodesBySeriesId(this.seriesId).subscribe(
      (list) => {
        this.episodeList = list
      }
    )

  }


  getabsolutePath(relativePath: string): string{
    return this.episodeService.getAbsolutePath(relativePath)
  }

  getDate(date: string): string{
    return moment(date, "DD-MM-YYYY").fromNow();
  }

  incrViews(_episode: Episode){
    this.episodeService.incrView(_episode.id).subscribe(
      (views) => {
        _episode.views = views
        console.log(views)
      }
    )
  }
}
