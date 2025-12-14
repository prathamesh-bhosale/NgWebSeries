import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/models/language';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  showloading: boolean = false;
  message: string = null;


  language: Language = {id: null, name: null}
  languageList: Language[] = [];
  editIndex : number = null;

  constructor(private languageService: LanguageService) { }

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
    if(this.language.id == null){
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
    this.language = {id: null, name: null}
  }
}
