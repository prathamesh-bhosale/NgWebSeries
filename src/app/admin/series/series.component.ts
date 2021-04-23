import { EpisodeService } from './../../services/episode.service';
import { SeriesService } from './../../services/series.service';
import { LanguageService } from './../../services/language.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Language } from 'src/app/models/language';
import { Series } from 'src/app/models/series';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  showloading: boolean = false;
  message: string = null;


  series: Series = {id: null, name: null, language: null, categories: null,
    story: null, forkid: null,
    imageurl: null, videourl: null
  }
  seriesList: Series[] = [];
  imageFile: File = null;
  videoFile: File = null;


  categoryList: Category[] = [];
  languageList: Language[] = []

  constructor(private categoryService: CategoryService,
   private seriesService: SeriesService,
   private languageService: LanguageService,
   private episodeService: EpisodeService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (list) => {
        this.categoryList = list
      }
    )

    this.seriesService.getAllSeriess().subscribe(
      (list) => {
        this.seriesList = list
      }
    )

    this.languageService.getAllLanguages().subscribe(
      (list) => {
        this.languageList = list
      }
    )
  }

  delete(_series: Series){
    console.log(_series)
    this.showloading = true
    this.message = 'Please wait .....'
    let index = this.seriesList.indexOf(_series)
    this.seriesService.deleteSeries(_series.id).subscribe(
      (deleted) => {
        setTimeout(() => {
          this.showloading = false
          this.message = "Series " + deleted.name + " deleted"
          this.seriesList.splice(index, 1)
        }, 1000);
      }
    )
  }

  submit(){
    this.showloading = true;
    this.message = "Please wait....."

    let _seriesFormData :FormData = new FormData()
    _seriesFormData.append("name", this.series.name)
    _seriesFormData.append("categories", this.series.categories)
    _seriesFormData.append("language", this.series.language)
    _seriesFormData.append("story", this.series.story)
    _seriesFormData.append("forkid", this.series.forkid ? "1" : null)
    _seriesFormData.append("imageurl", this.imageFile, this.imageFile.name)
    _seriesFormData.append("videourl", this.videoFile, this.videoFile.name)

    this.seriesService.addSeries(_seriesFormData).subscribe(
      (inserted) => {
        setTimeout(() => {
          this.showloading = false;
          this.message = "Series " + inserted.name + " added"
          this.seriesList.push(inserted)
          this.reset()
        }, 1000);
      }
    )
  }



  reset(){
    this.series = {id: null, name: null, language: null, categories: null,
       story: null, forkid: null,
      imageurl: null, videourl: null
    }
  }

  getAbosolutePath(relativePath: string): string{
    return this.seriesService.getAbsolutePath(relativePath);
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
