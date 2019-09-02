import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PostsComponent } from "./components/posts/posts.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { UsersComponent } from "./components/users/users.component";
import { DetailsComponent } from "./components/details/details.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: DashboardComponent },
      { path: "posts", component: PostsComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "users", component: UsersComponent },
      { path: "details", component: DetailsComponent },
      {
        path: "**",
        redirectTo: ""
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
