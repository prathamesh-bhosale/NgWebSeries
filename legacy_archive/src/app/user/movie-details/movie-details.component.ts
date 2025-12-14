import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie = {id: null, name: null, releaseddate: null,
  imageurl: null, views: null, videourl: null, story: null, categories: null,
  language: null, forkid: null};

  recommendedMovieList: Movie[] = []

  constructor(private movieService: MovieService,
    private activateRoute: ActivatedRoute,
    private router: Router)
  {

  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(
      (params) => {
        this.movie.id = +params.get("movieid")
        console.log(this.movie.id)
        this.movieService.getMovieById(this.movie.id).subscribe(
          (movie) => {
            this.movie = movie
            let gener: string[] =  this.movie.categories.split(",")

            //console.log(gener)
            this.movieService.getAllMovies().subscribe(
              (list) => {
                list.forEach(_movie => {
                    //console.log(_movie)
                    gener.forEach(g => {

                      if(_movie.categories.indexOf(g) > -1)
                      {
                        if(this.recommendedMovieList.indexOf(_movie) == -1)
                        {
                          this.recommendedMovieList.push(_movie)
                          console.log(g, " -> ", _movie.categories)
                        }
                      }
                    });
                });
                console.log('Recommended -> ', this.recommendedMovieList)
                if(this.recommendedMovieList.length > 3)
                {
                  this.recommendedMovieList = this.recommendedMovieList.splice(3, this.recommendedMovieList.length - 3)
                }
              }
            )
          }
        )
      }
    )
  }

  getAbsolutePath(relativePath: string): string{
    return this.movieService.getAbsolutePath(relativePath)
  }

  getReleaseDate(date: string): string{
    return moment(date, 'yyyy-mm-dd').format('DD MMM yyyy');
  }

  onMetadata(e, video) {
    console.log('metadata: ', e);
    let duration: any = video.duration
    duration = new Date(duration * 1000).toISOString().substr(11, 8);
    duration = duration.split(":")
    console.log(duration)
    let h: number = parseInt(duration[0])
    let m: number = parseInt(duration[1])
    let s: number = parseInt(duration[2])
    this.movie.duration = h + "h " + m + "min " + s + "sec"
  }

  redirectToMovieDetails(_movie: Movie)
  {
    this.router.navigate(['/user/moviedetails', _movie.id]);
  }

}
