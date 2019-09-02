import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    const { email, password } = this.loginForm.value;
    this._authService.login(password, email).subscribe((data: any) => {
      this.router.navigate(['/admin'])
    }, (error: any) => {
      console.log(error);
    })
  }

}