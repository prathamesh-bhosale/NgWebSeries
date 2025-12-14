import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import moment from 'moment';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetailsComponent implements OnInit {

  private movieService = inject(MovieService);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);

  movie: Movie = new Movie(0, '', '', '', '', '', '', '', '', 0);

  recommendedMovieList: Movie[] = []

  constructor() { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(
      (params) => {
        const id = params.get("movieid");
        if(id) {
            this.movie.id = +id;
            console.log(this.movie.id)
            this.movieService.getMovieById(this.movie.id).subscribe(
              (movie) => {
                this.movie = movie
                if (this.movie.categories) {
                    let gener: string[] =  this.movie.categories.split(",")

                    //console.log(gener)
                    this.movieService.getAllMovies().subscribe(
                      (list) => {
                        this.recommendedMovieList = []; // clear list on new movie load
                        list.forEach(_movie => {
                            //console.log(_movie)
                            gener.forEach(g => {

                              if(_movie.categories && _movie.categories.indexOf(g) > -1)
                              {
                                if(this.recommendedMovieList.indexOf(_movie) == -1 && _movie.id !== this.movie.id) // Avoid self
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
                          this.recommendedMovieList = this.recommendedMovieList.slice(0, 3); // Use slice instead of splice to be cleaner, though splice works
                        }
                      }
                    )
                }
              }
            )
        }
      }
    )
  }

  getAbsolutePath(relativePath: string): string{
    return this.movieService.getAbsolutePath(relativePath)
  }

  getReleaseDate(date: string): string{
    return moment(date, 'yyyy-mm-dd').format('DD MMM yyyy');
  }

  onMetadata(e: any, video: any) {
    console.log('metadata: ', e);
    let duration: any = video.duration
    // duration in seconds
    let dateObj = new Date(duration * 1000);
    // toISOString may behave differently depending on timezone or epoch?
    // simplest correct formatting:
    let h = Math.floor(duration / 3600);
    let m = Math.floor((duration % 3600) / 60);
    let s = Math.floor(duration % 60);

    this.movie.duration = h + "h " + m + "min " + s + "sec"
  }

  redirectToMovieDetails(_movie: Movie)
  {
    this.router.navigate(['/user/moviedetails', _movie.id]);
  }

}
