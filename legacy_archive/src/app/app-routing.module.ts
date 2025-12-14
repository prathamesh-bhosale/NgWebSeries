import { KidsComponent } from './user/kids/kids.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { EpisodesListComponent } from './user/episodes-list/episodes-list.component';
import { SeriesListComponent } from './user/series-list/series-list.component';
import { MovieListComponent } from './user/movie-list/movie-list.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserComponent } from './user/user/user.component';
import { CategoryComponent } from './admin/category/category.component';
import { LanguageComponent } from './admin/language/language.component';
import { MoviesComponent } from './admin/movies/movies.component';
import { SeriesComponent } from './admin/series/series.component';
import { EpisodesComponent } from './admin/episodes/episodes.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminComponent } from './admin/admin/admin.component';
import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './common/home/home.component';
import { CommonComponent } from './common/common/common.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './user/movie-details/movie-details.component';

const routes: Routes = [

  //default
  {path: "", redirectTo: "/common/home", pathMatch: 'full'},
  //common path
  {path: "common", component: CommonComponent, children: [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "contactus", component: ContactusComponent}
  ]},

  //admin path
  {path: "admin", component: AdminComponent, children: [
    {path: "", component: AdmindashboardComponent},
    {path: "genres", component: CategoryComponent},
    {path: "language", component: LanguageComponent},
    {path: "movies", component: MoviesComponent},
    {path: "series", component: SeriesComponent},
    {path: "episodes/:seriesid", component: EpisodesComponent},
  ]},

  //user path
  {path: "user", component: UserComponent, children: [
    {path: "", component: UserHomeComponent},
    {path: "movielist", component: MovieListComponent},
    {path: "moviedetails/:movieid", component: MovieDetailsComponent},
    {path: "serieslist", component: SeriesListComponent},
    {path: "episodeslist/:seriesid", component: EpisodesListComponent},
    {path: "kids", component: KidsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
