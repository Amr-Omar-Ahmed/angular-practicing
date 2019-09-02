import { Injectable, OnInit } from '@angular/core';
import { Category } from '../../Admin/models/category.model';

@Injectable()
export class DataStorageService {

  private categories: any[] = [];

  constructor() {
    for (let index = 1; index < 5; index++) {
      this.categories.push(new Category(index, "Web Dev" + index, new Date()));
    }
  }

  getCategories() {
    return this.categories;
  }
  getCategoryById(id: number) {
    return this.categories.find(cat => cat.id == id);
  }
  getEditedObjDetails(data: any) {
    if (+data.categoryId) return this.getCategoryById(data.categoryId)
  }
}
