import { Routes } from '@angular/router';
import { CommonComponent } from './common/common/common';
import { HomeComponent } from './common/home/home';
import { LoginComponent } from './common/login/login';
import { ContactusComponent } from './common/contactus/contactus';

import { AdminComponent } from './admin/admin/admin';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard';
import { CategoryComponent } from './admin/category/category';
import { LanguageComponent } from './admin/language/language';
import { MoviesComponent } from './admin/movies/movies';
import { SeriesComponent } from './admin/series/series';
import { EpisodesComponent } from './admin/episodes/episodes';

import { UserComponent } from './user/user/user';
import { UserHomeComponent } from './user/user-home/user-home';
import { MovieListComponent } from './user/movie-list/movie-list';
import { MovieDetailsComponent } from './user/movie-details/movie-details';
import { SeriesListComponent } from './user/series-list/series-list';
import { EpisodesListComponent } from './user/episodes-list/episodes-list';
import { KidsComponent } from './user/kids/kids';

export const routes: Routes = [
    // Default
    { path: "", redirectTo: "/common/home", pathMatch: 'full' },

    // Common Area
    {
        path: "common",
        component: CommonComponent,
        children: [
            { path: "", component: HomeComponent },
            { path: "home", component: HomeComponent },
            { path: "login", component: LoginComponent },
            { path: "contactus", component: ContactusComponent }
        ]
    },

    // Admin Area
    {
        path: "admin",
        component: AdminComponent,
        children: [
            { path: "", component: AdmindashboardComponent },
            { path: "genres", component: CategoryComponent },
            { path: "language", component: LanguageComponent },
            { path: "movies", component: MoviesComponent },
            { path: "series", component: SeriesComponent },
            { path: "episodes/:seriesid", component: EpisodesComponent },
        ]
    },

    // User Area
    {
        path: "user",
        component: UserComponent,
        children: [
            { path: "", component: UserHomeComponent },
            { path: "movielist", component: MovieListComponent },
            { path: "moviedetails/:movieid", component: MovieDetailsComponent },
            { path: "serieslist", component: SeriesListComponent },
            { path: "episodeslist/:seriesid", component: EpisodesListComponent },
            { path: "kids", component: KidsComponent }
        ]
    }
];
