import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//HttpClient -> get, put, post,delete
import { HttpClientModule } from '@angular/common/http';

//ngform, ngmodel
import { FormsModule } from '@angular/forms';

//navigation from one page to another
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './common/home/home.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { CommonComponent } from './common/common/common.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { LanguageComponent } from './admin/language/language.component';
import { MoviesComponent } from './admin/movies/movies.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { SeriesComponent } from './admin/series/series.component';
import { EpisodesComponent } from './admin/episodes/episodes.component';
import { UserComponent } from './user/user/user.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { MovieListComponent } from './user/movie-list/movie-list.component';
import { MovieDetailsComponent } from './user/movie-details/movie-details.component';
import { SeriesListComponent } from './user/series-list/series-list.component';
import { EpisodesListComponent } from './user/episodes-list/episodes-list.component';
import { from } from 'rxjs';
import { KidsComponent } from './user/kids/kids.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ContactusComponent,
    CommonComponent,
    AdminComponent,
    CategoryComponent,
    LanguageComponent,
    MoviesComponent,
    AdmindashboardComponent,
    SeriesComponent,
    EpisodesComponent,
    UserComponent,
    UserHomeComponent,
    MovieListComponent,
    MovieDetailsComponent,
    SeriesListComponent,
    EpisodesListComponent,
    KidsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
