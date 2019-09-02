import { NgModule } from "@angular/core";

import { ProfileComponent } from "./components/profile/profile.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { PostsComponent } from "./components/posts/posts.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { UsersComponent } from "./components/users/users.component";
import { DetailsComponent } from "./components/details/details.component";
import { SearchComponent } from "./components/search/search.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminHomePageComponent } from "./components/admin-home-page/admin-home-page.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SharedModule } from '../Shared/shared.module';

const adminComponents = [
  ProfileComponent,
  SettingsComponent,
  PostsComponent,
  CategoriesComponent,
  UsersComponent,
  DashboardComponent,
  DetailsComponent,
  SearchComponent
];
@NgModule({
  declarations: [...adminComponents, AdminHomePageComponent],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
