import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../Shared/shared.module';



@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
