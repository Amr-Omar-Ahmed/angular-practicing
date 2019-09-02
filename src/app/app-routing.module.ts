import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './Core/gaurds/auth-gaurd.service';
import { ServerHomePageComponent } from './Servers/server-home-page/server-home-page.component';
import { CustomPreloadingService } from './Core/services/custom-preloading.service';
import { PageNotFoundComponent } from './Core/Layout/page-not-found/page-not-found.component';


const routes: Routes = [

  {
    path: 'admin',
    data: { preload: true, delay: true },
    loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGaurd]
  },
  { path: 'servers', component: ServerHomePageComponent },

  // { path: 'not-found', component: PageNotFoundComponent },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
  { path: '**', redirectTo: '/signup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    //preloadingStrategies => Eageer lazy loading
    //preload all modules 
    // { preloadingStrategy: PreloadAllModules }
    //preload custom modules based on data passed in route
    { preloadingStrategy: CustomPreloadingService }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
