import { Component, OnInit } from '@angular/core';

import { LayoutService } from 'src/app/Core/Services/layout.service';
import { DataStorageService } from '../../../Core/services/data-storage.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  constructor(private _layoutService: LayoutService,
    private _dataStorageService: DataStorageService) { }
  ngOnInit() {
    this._layoutService.setComponentTitleListener("Categories");
    this.categories = this._dataStorageService.getCategories();
  }

}
