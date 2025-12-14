import { SeriesService } from './../../services/series.service';
import { Series } from './../../models/series';
import { MovieService } from './../../services/movie.service';
import { Movie } from 'src/app/models/movie';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {

  movieList: Movie[] = []
  seriesList: Series[] = []

  constructor(private router: Router,
    private movieService: MovieService,
    private seriesService: SeriesService) { }

  ngOnInit(): void {

    this.seriesService.getAllSeriess().subscribe(
      (list) => {
        this.seriesList = list.filter(s => Boolean(s.forkid))
        //console.log(this.seriesList)
      }
    )

    this.movieService.getAllMovies().subscribe(
      (list) => {
        //console.log('list -> ', list)
        this.movieList = list.filter(m => Boolean(m.forkid) )
        //console.log('movie -> ', this.movieList)
      }
    )
  }


  getAbsolutePath(relativePath:string): string{
    return this.movieService.getAbsolutePath(relativePath);
  }

  getReleaseDate(date: string): string{
    return moment(date, 'yyyy-mm-dd').format('DD MMM yyyy');
  }
}
