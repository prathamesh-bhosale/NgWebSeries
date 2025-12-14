import { MovieService } from './../../services/movie.service';
import { LanguageService } from './../../services/language.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Language } from 'src/app/models/language';
import { Movie } from 'src/app/models/movie';


import * as moment from 'moment';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  categoryList: Category[] = []
  languageList: Language[] = []
  movieList: Movie[] = []
  movieListCopy: Movie[] = []

  gener: string = "0"
  langauge: string = "0"

  constructor(private router: Router,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (list) => {
        this.categoryList = list
      }
    )

    this.languageService.getAllLanguages().subscribe(
      (list) => {
        this.languageList = list
      }
    )

    this.movieService.getAllMovies().subscribe(
      (list) => {
        this.movieList = list
        this.movieListCopy = list
      }
    )
  }

  redirectToMovieDetails(_movie: Movie)
  {
    this.router.navigate(['/user/moviedetails', _movie.id]);
  }

  getAbsolutePath(relativePath:string): string{
    return this.movieService.getAbsolutePath(relativePath);
  }

  getReleaseDate(date: string): string{
    return moment(date, 'yyyy-mm-dd').format('DD MMM yyyy');
  }

  sort(){
    console.log('gener -> ', this.gener, ' langage -> ', this.langauge)

    this.movieList = this.movieListCopy

    if(this.langauge != "0")
      this.movieList = this.movieList.filter(m => m.language == this.langauge)

      //'crime,horror'.indexOf('comdey') -> -1
      //'crime,horror'.indexOf('horror') -> 6
    if(this.gener != "0")
      this.movieList = this.movieList.filter(m => m.categories.indexOf(this.gener) > -1)
  }
}
