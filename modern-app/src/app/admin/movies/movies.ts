import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { LanguageService } from '../../services/language.service';
import { Movie } from '../../models/movie';
import { Category } from '../../models/category';
import { Language } from '../../models/language';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class MoviesComponent implements OnInit {

  private movieService = inject(MovieService);
  private categoryService = inject(CategoryService);
  private languageService = inject(LanguageService);

  showloading: boolean = false;
  message: string | null = null;

  movie: Movie = new Movie(0, '', '', '', '', '', '', '', '', 0);
  movieList: Movie[] = [];
  imageFile: File | null = null;
  videoFile: File | null = null;

  categoryList: Category[] = [];
  languageList: Language[] = []

  constructor() { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (list) => {
        this.categoryList = list
      }
    )

    this.movieService.getAllMovies().subscribe(
      (list) => {
        this.movieList = list
      }
    )

    this.languageService.getAllLanguages().subscribe(
      (list) => {
        this.languageList = list
      }
    )
  }

  delete(_movie: Movie){
    console.log(_movie)
    this.showloading = true
    this.message = 'Please wait .....'
    let index = this.movieList.indexOf(_movie)
    this.movieService.deleteMovie(_movie.id).subscribe(
      (deleted) => {
        setTimeout(() => {
          this.showloading = false
          this.message = "Movie " + deleted.name + " deleted"
          this.movieList.splice(index, 1)
        }, 1000);
      }
    )
  }

  submit(){
    this.showloading = true;
    this.message = "Please wait....."

    let _movieFormData :FormData = new FormData()
    _movieFormData.append("name", this.movie.name)
    _movieFormData.append("categories", this.movie.categories)
    _movieFormData.append("language", this.movie.language)
    _movieFormData.append("releaseddate", this.movie.releaseddate)
    _movieFormData.append("story", this.movie.story)
    _movieFormData.append("forkid", this.movie.forkid ?? "0")
    if(this.imageFile) _movieFormData.append("imageurl", this.imageFile, this.imageFile.name)
    if(this.videoFile) _movieFormData.append("videourl", this.videoFile, this.videoFile.name)

    this.movieService.addMovie(_movieFormData).subscribe({
      next: (inserted) => {
        setTimeout(() => {
          this.showloading = false;
          this.message = "Movie " + inserted.name + " added"
          this.movieList.push(inserted)
          this.reset()
        }, 1000);
      },
      error: (err) => {
        this.showloading = false;
        this.message = "Error: " + (err.error?.message || "Failed to add movie");
        console.error(err);
      }
    })
  }

  reset(){
    this.movie = new Movie(0, '', '', '', '', '', '', '', '', 0);
    this.imageFile = null;
    this.videoFile = null;
  }

  getAbsolutePath(relativePath: string): string{
    return this.movieService.getAbsolutePath(relativePath);
  }

  selectedImage(event: any){
    this.imageFile = event.target.files[0]
    console.log(this.imageFile)
  }

  selectedVideo(event: any){
    this.videoFile = event.target.files[0]
    console.log(this.videoFile)
  }
}
