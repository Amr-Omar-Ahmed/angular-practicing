import { Injectable, EventEmitter, Output } from "@angular/core";
import { User } from 'src/app/Shared/models/user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const baseHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  @Output() userNameListener = new EventEmitter<string>();
  private Token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private userName: string;
  baseUrl = environment.baseURL;
  constructor(private httpClient: HttpClient, private router: Router) { }

  userNameChenged(userName) {
    this.userNameListener.emit(userName)
  }


  signup(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}auth/signup`, user, baseHeaders)
      .pipe(map((response: any) => {
        if (response != null) {
          return response;
        }
      }), catchError(this.handleError));
  }


  login(password, email) {
    const body = { password, email }
    return this.httpClient.post<User>(`${this.baseUrl}auth/login`, body, baseHeaders)
      .pipe(map((response: any) => {
        if (response != null) {
          const token = response.token;
          this.Token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userName = response.fullName;
            this.userNameChenged(this.userName)
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate, this.userName);
          }
          this.router.navigate(["/admin"]);
          return response;
        }
      }), catchError(this.handleError));
  }


  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  public getToken() {
    return this.Token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.Token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.Token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userName: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userName", userName);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userName");
  }

  getUserName() {
    debugger;
    const userName = localStorage.getItem("userName");
    return userName != '' ? userName : '';
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userName = localStorage.getItem("userName");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userName

    }
  }
}