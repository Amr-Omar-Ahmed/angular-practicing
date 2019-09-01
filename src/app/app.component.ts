import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';
  authenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuthStatusListener().subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    })
    this.authService.autoAuthUser();
    const isAuth = this.authService.getIsAuth();
    if (isAuth) {
      this.router.navigate(['/admin']);
    }
  }


}

