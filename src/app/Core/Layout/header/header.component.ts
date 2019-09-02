import { LayoutService } from '../../../Core/Services/layout.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  componentName: string;
  @Input() isAuthenticated: boolean;
  // isAuthenticated: boolean;
  constructor(private _layoutService: LayoutService, private authService: AuthService) { }

  GetComponentNameSubctription: Subscription;

  ngOnInit() {
    // this.isAuthenticated = this.authService.getIsAuth();
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
