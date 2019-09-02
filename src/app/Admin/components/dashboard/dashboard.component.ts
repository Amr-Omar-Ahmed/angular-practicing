import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/Core/Services/layout.service';
import { DataStorageService } from '../../../Core/services/data-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _layoutService: LayoutService, private _dataStorageService: DataStorageService) { }
  categories: any;

  ngOnInit() {
    this._layoutService.setComponentTitleListener("Dashboard");
    this.categories = this._dataStorageService.getCategories();
  }


}
