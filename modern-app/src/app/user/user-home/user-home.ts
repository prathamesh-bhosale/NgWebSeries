import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css'
})
export class UserHomeComponent implements OnInit {

  private movieService = inject(MovieService);
  latestMovies: Movie[] = [];

  constructor() { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.latestMovies = movies.slice(0, 12); // Show top 12 movies
      },
      error: (err) => {
        console.error('Failed to load movies', err);
      }
    });
  }

  getAbsolutePath(relativePath: string): string {
    return this.movieService.getAbsolutePath(relativePath);
  }

  getReleaseDate(date: string): string {
     return date; // or format it using moment/Date
  }
}
