import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { CategoryService } from '../../services/category.service';
import { LanguageService } from '../../services/language.service';
import { Series } from '../../models/series';
import { Category } from '../../models/category';
import { Language } from '../../models/language';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './series-list.html',
  styleUrl: './series-list.css'
})
export class SeriesListComponent implements OnInit {

  private router = inject(Router);
  private seriesService = inject(SeriesService);
  private categoryService = inject(CategoryService);
  private languageService = inject(LanguageService);

  categoryList: Category[] = []
  languageList: Language[] = []
  seriesList: Series[] = []
  seriesListCopy: Series[] = []

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

    if(this.gener != "0")
      this.seriesList = this.seriesList.filter(m => m.categories.indexOf(this.gener) > -1)
  }
}
