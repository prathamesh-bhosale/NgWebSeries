import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  private movieService = inject(MovieService);
  latestMovies: Movie[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  ngOnInit(): void {
    this.isLoading = true;
    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.latestMovies = movies.slice(0, 6);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load movies', err);
        this.errorMessage = 'Failed to load movies. Please check console.';
        this.isLoading = false;
      }
    });
  }

  loadDummyMovies() {
    // Deprecated: We want to use real data
  }

  getAbsolutePath(relativePath: string): string {
    return this.movieService.getAbsolutePath(relativePath);
  }

  getReleaseDate(date: string | undefined): string {
    if (!date) return '';
    return new Date(date).toDateString();
  }
}
