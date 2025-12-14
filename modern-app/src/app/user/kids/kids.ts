import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { MovieService } from '../../services/movie.service';
import { Series } from '../../models/series';
import { Movie } from '../../models/movie';
import moment from 'moment';

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './kids.html',
  styleUrl: './kids.css'
})
export class KidsComponent implements OnInit {

  private seriesService = inject(SeriesService);
  private movieService = inject(MovieService);

  movieList: Movie[] = []
  seriesList: Series[] = []

  constructor() { }

  ngOnInit(): void {

    this.seriesService.getAllSeriess().subscribe(
      (list) => {
        this.seriesList = list.filter(s => Boolean(s.forkid))
      }
    )

    this.movieService.getAllMovies().subscribe(
      (list) => {
        this.movieList = list.filter(m => Boolean(m.forkid) )
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
