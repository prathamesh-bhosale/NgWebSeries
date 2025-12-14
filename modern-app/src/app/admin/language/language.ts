import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './language.html',
  styleUrl: './language.css'
})
export class LanguageComponent implements OnInit {

  private languageService = inject(LanguageService);

  showloading: boolean = false;
  message: string | null = null;

  language: Language = new Language(0, '');
  languageList: Language[] = [];
  editIndex : number = -1;

  constructor() { }

  ngOnInit(): void {
    this.languageService.getAllLanguages().subscribe(
      (list) => {
        this.languageList = list
      }
    )
  }

  delete(_language: Language){
    this.showloading = true
    this.message = 'Please wait .....'
    let index = this.languageList.indexOf(_language)
    this.languageService.deleteLanguage(_language.id).subscribe(
      (deleted) => {
        setTimeout(() => {
          this.showloading = false
          this.message = "Language " + deleted.name + " deleted"
          this.languageList.splice(index, 1)
        }, 1000);
      }
    )
  }

  submit(){
    this.showloading = true;
    this.message = "Please wait....."
    if(this.language.id == 0){
      console.log("Add")
      this.insert()
    }
    else {
      console.log("Update")
      this.update()
    }
  }

  insert(){
    this.languageService.addLanguage(this.language).subscribe(
      (inserted) => {
        setTimeout(() => {
          this.showloading = false;
          this.message = "Language " + inserted.name + " added"
          this.languageList.push(inserted)
          this.reset()
        }, 1000);
      }
    )
  }

  edit(_language: Language){
    this.editIndex = this.languageList.indexOf(_language)
    console.log(this.editIndex)
    console.log(_language)
    this.language = Object.assign({}, _language)
  }

  update(){
    this.languageService.updateLanguage(this.language).subscribe(
      (updated) => {
        setTimeout(() => {
          this.showloading = false;
          this.message = "Language " + updated.name + " updated"
          this.languageList.splice(this.editIndex, 1, updated)
          this.reset()
        }, 1000);
      }
    )
  }

  reset(){
    this.language = new Language(0, '');
    this.editIndex = -1;
  }
}
