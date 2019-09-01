import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() isAuthenticated: boolean;
  userName: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.userNameListener.subscribe((user: string) => {
      this.userName = user
    })
  }

  logout() {
    this.authService.logout();

  }

}