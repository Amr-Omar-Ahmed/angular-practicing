import { LayoutService } from '../../../../Shared/Services/layout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private _layoutService: LayoutService) { }

  ngOnInit() {
    this._layoutService.setComponentTitleListener("Dashboard");
  }
  ngOnDestroy() {

  }
}
