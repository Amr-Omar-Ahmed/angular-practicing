import { LayoutService } from './../../Services/layout.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  componentName: string;
  @Input() isAuthenticated: boolean;
  constructor(private _layoutService: LayoutService) { }

  GetComponentNameSubctription: Subscription;

  ngOnInit() {
    console.log("header", this.isAuthenticated)
    this.GetComponentNameSubctription = this._layoutService.getComponentTitleListener().subscribe(
      (name: string) => {
        this.componentName = name;
      }
    )

  }
  ngOnDestroy() {
    if (this.GetComponentNameSubctription) {
      this.GetComponentNameSubctription.unsubscribe()
    }
  }
}
