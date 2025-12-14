import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { EpisodeService } from '../../services/episode.service';
import { Episode } from '../../models/episode';
import moment from 'moment';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './episodes-list.html',
  styleUrl: './episodes-list.css'
})
export class EpisodesListComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private seriesService = inject(SeriesService);
  private episodeService = inject(EpisodeService);

  seriesId: number | null = null;
  seriesName: string | null = null;

  episodeList: Episode[] = []

  constructor() {
    const id = this.activatedRoute.snapshot.params["seriesid"];
    this.seriesId = id ? +id : null;
   }

  ngOnInit(): void {
    if(this.seriesId) {
        this.seriesService.getSeriesById(this.seriesId).subscribe(
        (series) => {
            if(series) this.seriesName = series.name
        }
        )

        this.episodeService.getAllEpisodesBySeriesId(this.seriesId).subscribe(
        (list) => {
            this.episodeList = list
        }
        )
    }
  }


  getabsolutePath(relativePath: string): string{
    return this.episodeService.getAbsolutePath(relativePath)
  }

  getDate(date?: string): string{
    if(!date) return '';
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
