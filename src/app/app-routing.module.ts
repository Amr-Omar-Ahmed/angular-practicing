import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './Shared/Layout/page-not-found/page-not-found.component';
import { AuthGaurd } from './auth/services/auth-gaurd.service';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { ServerHomePageComponent } from './Servers/server-home-page/server-home-page.component';


const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'servers',
    component: ServerHomePageComponent
  },
  // {
  //     path: 'users', component: UsersComponent, children: [
  //         { path: ':id/:name', component: UserComponent }
  //     ]
  // },
  // {
  //     path: 'servers',
  //     // canActivate: [AuthGaurdService],
  //     canActivateChild: [AuthGaurdService],
  //     component: ServersComponent,
  //     children: [
  //         { path: ':id', component: ServerComponent },
  //         { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivatGaurdService] },
  //     ]
  // },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'Login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
