import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PostsComponent } from './components/posts/posts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UsersComponent } from './components/users/users.component';
import { DetailsComponent } from './components/details/details.component';
import { SearchComponent } from './components/search/search.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomePageComponent } from './components/admin-home-page/admin-home-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const adminComponents = [
  ProfileComponent, SettingsComponent, PostsComponent,
  CategoriesComponent, UsersComponent, DashboardComponent, DetailsComponent, SearchComponent]
@NgModule({
  declarations: [...adminComponents, AdminHomePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  exports: [...adminComponents]
})
export class AdminModule { }
