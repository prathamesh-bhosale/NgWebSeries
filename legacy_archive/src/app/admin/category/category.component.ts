import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  showloading: boolean = false;
  message: string = null;


  category: Category = {id: null, name: null}
  categoryList: Category[] = [];
  editIndex : number = null;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (list) => {
        this.categoryList = list
      }
    )
  }

  delete(_category: Category){
    this.showloading = true
    this.message = 'Please wait .....'
    let index = this.categoryList.indexOf(_category)
    this.categoryService.deleteCategory(_category.id).subscribe(
      (deleted) => {
        setTimeout(() => {
          this.showloading = false
          this.message = "Category " + deleted.name + " deleted"
          this.categoryList.splice(index, 1)
        }, 1000);
      }
    )
  }

  submit(){
    this.showloading = true;
    this.message = "Please wait....."
    if(this.category.id == null){
      console.log("Add")
      this.insert()
    }
    else {
      console.log("Update")
      this.update()
    }
  }

  insert(){
    this.categoryService.addCategory(this.category).subscribe(
      (inserted) => {
        setTimeout(() => {
          this.showloading = false;
          this.message = "Category " + inserted.name + " added"
          this.categoryList.push(inserted)
          this.reset()
        }, 1000);
      }
    )
  }

  edit(_category: Category){
    this.editIndex = this.categoryList.indexOf(_category)
    console.log(this.editIndex)
    console.log(_category)
    this.category = Object.assign({}, _category)
  }

  update(){
    this.categoryService.updateCategory(this.category).subscribe(
      (updated) => {
        setTimeout(() => {
          this.showloading = false;
          this.message = "Category " + updated.name + " updated"
          this.categoryList.splice(this.editIndex, 1, updated)
          this.reset()
        }, 1000);
      }
    )
  }

  reset(){
    this.category = {id: null, name: null}
  }
}
