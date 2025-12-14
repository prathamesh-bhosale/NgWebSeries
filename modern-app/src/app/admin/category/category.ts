import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);

  showloading: boolean = false;
  message: string | null = null; // Type safety

  category: Category = new Category(0, '');
  categoryList: Category[] = [];
  editIndex : number = -1; // Initialize with -1

  constructor() { }

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
    // Check if ID is 0 instead of null, assuming 0 means new
    if(this.category.id == 0){
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
    this.category = Object.assign({}, _category) // Clone
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
    this.category = new Category(0, '');
    this.editIndex = -1;
  }
}
