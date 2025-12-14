import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { LanguageService } from '../../services/language.service';
import { Movie } from '../../models/movie';
import { Category } from '../../models/category';
import { Language } from '../../models/language';
import moment from 'moment';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieListComponent implements OnInit {

  private router = inject(Router);
  private movieService = inject(MovieService);
  private categoryService = inject(CategoryService);
  private languageService = inject(LanguageService);

  categoryList: Category[] = []
  languageList: Language[] = []
  movieList: Movie[] = []
  movieListCopy: Movie[] = []

  gener: string = "0"
  langauge: string = "0"

  constructor() { }

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

    if(this.gener != "0")
      this.movieList = this.movieList.filter(m => m.categories.indexOf(this.gener) > -1)
  }
}
