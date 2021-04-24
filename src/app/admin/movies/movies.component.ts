import { LanguageService } from './../../services/language.service';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';
import { CategoryService } from 'src/app/services/category.service';
import { Language } from 'src/app/models/language';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  showloading: boolean = false;
  message: string = null;


  movie: Movie = {id: null, name: null, language: null, categories: null,
    duration: null, releaseddate: null, story: null, forkid: null,
    imageurl: null, videourl: null, views: 0
  }
  movieList: Movie[] = [];
  imageFile: File = null;
  videoFile: File = null;


  categoryList: Category[] = [];
  languageList: Language[] = []

  constructor(private categoryService: CategoryService,
   private movieService: MovieService,
   private languageService: LanguageService) { }

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
    _movieFormData.append("forkid", this.movie.forkid)
    _movieFormData.append("imageurl", this.imageFile, this.imageFile.name)
    _movieFormData.append("videourl", this.videoFile, this.videoFile.name)

    this.movieService.addMovie(_movieFormData).subscribe(
      (inserted) => {
        setTimeout(() => {
          this.showloading = false;
          this.message = "Movie " + inserted.name + " added"
          this.movieList.push(inserted)
          this.reset()
        }, 1000);
      }
    )
  }



  reset(){
    this.movie = {id: null, name: null, language: null, categories: null,
      duration: null, releaseddate: null, story: null, forkid: null,
      imageurl: null, videourl: null, views: 0
    }
  }

  getAbosolutePath(relativePath: string): string{
    return this.movieService.getAbsolutePath(relativePath);
  }

  selectedImage(event){
    this.imageFile = event.target.files[0]
    console.log(this.imageFile)
  }

  selectedVideo(event){
    this.videoFile = event.target.files[0]
    console.log(this.videoFile)
  }
}
