import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/Core/Services/layout.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _layoutService: LayoutService) { }

  ngOnInit() {
    this._layoutService.setComponentTitleListener("Users");
  }

}
