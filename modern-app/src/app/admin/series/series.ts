import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeriesService } from '../../services/series.service';
import { CategoryService } from '../../services/category.service';
import { LanguageService } from '../../services/language.service';
import { Series } from '../../models/series';
import { Category } from '../../models/category';
import { Language } from '../../models/language';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './series.html',
  styleUrl: './series.css'
})
export class SeriesComponent implements OnInit {

  private seriesService = inject(SeriesService);
  private categoryService = inject(CategoryService);
  private languageService = inject(LanguageService);

  showloading: boolean = false;
  message: string | null = null;

  series: Series = new Series(0, '', '', '', '', '', '', '');
  seriesList: Series[] = [];
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
    _seriesFormData.append("forkid", this.series.forkid ? "1" : "0")
    if(this.imageFile) _seriesFormData.append("imageurl", this.imageFile, this.imageFile.name)
    if(this.videoFile) _seriesFormData.append("videourl", this.videoFile, this.videoFile.name)

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
    this.series = new Series(0, '', '', '', '', '', '', '');
    this.imageFile = null;
    this.videoFile = null;
  }

  getAbsolutePath(relativePath: string): string{
    return this.seriesService.getAbsolutePath(relativePath);
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
