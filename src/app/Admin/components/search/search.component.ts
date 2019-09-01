import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() serachBtnColor;
  ngOnInit() {
    console.log(this.serachBtnColor);
  }

  getColor() {
    return
  }

  ngOnDestroy() {

  }

}
