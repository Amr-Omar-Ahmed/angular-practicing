import { LayoutService } from '../../../Shared/Services/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private _layoutService: LayoutService) { }

  ngOnInit() {
    this._layoutService.setComponentTitleListener("Posts");
  }

}
