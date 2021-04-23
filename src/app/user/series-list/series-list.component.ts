import { LanguageService } from './../../services/language.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Language } from 'src/app/models/language';
import { Series } from 'src/app/models/series';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  categoryList: Category[] = []
  languageList: Language[] = []
  seriesList: Series[] = []
  seriesListCopy: Series[] = []

  gener: string = "0"
  langauge: string = "0"

  constructor(private router: Router,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private seriesService: SeriesService) { }

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

    this.seriesService.getAllSeriess().subscribe(
      (list) => {
        this.seriesList = list
        this.seriesListCopy = list
      }
    )
  }


  getAbsolutePath(relativePath:string): string{
    return this.seriesService.getAbsolutePath(relativePath);
  }


  sort(){
    console.log('gener -> ', this.gener, ' langage -> ', this.langauge)

    this.seriesList = this.seriesListCopy

    if(this.langauge != "0")
      this.seriesList = this.seriesList.filter(s => s.language == this.langauge)

      //'crime,horror'.indexOf('comdey') -> -1
      //'crime,horror'.indexOf('horror') -> 6
    if(this.gener != "0")
      this.seriesList = this.seriesList.filter(m => m.categories.indexOf(this.gener) > -1)
  }
}
