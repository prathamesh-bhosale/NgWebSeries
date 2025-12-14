import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { MoviesComponent } from './movies';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { LanguageService } from '../../services/language.service';
import { Movie } from '../../models/movie';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    
    vi.spyOn(TestBed.inject(CategoryService), 'getAllCategories').mockReturnValue(of([]));
    vi.spyOn(TestBed.inject(LanguageService), 'getAllLanguages').mockReturnValue(of([]));
    vi.spyOn(movieService, 'getAllMovies').mockReturnValue(of([]));

    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list movie with huge story text', async () => {
    const hugeText = 'a'.repeat(20000);
    component.movie.name = 'Huge Movie';
    component.movie.story = hugeText;
    
    vi.spyOn(movieService, 'addMovie').mockReturnValue(of(
      new Movie(101, 'Huge Movie', 'Action', 'English', '2023-01-01', hugeText, '0', '', '', 0, '120m')
    ));

    component.submit();
    
    // Wait for setTimeout in submit() (1000ms)
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    expect(component.message).toContain('added');
    expect(component.movieList.length).toBe(1);
    expect(component.movieList[0].story.length).toBe(20000);
  });

  it('should submit form data correctly even with missing optional files', async () => {
    component.movie.name = 'No Files Movie';
    component.imageFile = null;
    component.videoFile = null;

    const addSpy = vi.spyOn(movieService, 'addMovie').mockReturnValue(of(
      new Movie(102, 'No Files Movie', '', '', '', '', '0', '', '', 0)
    ));

    component.submit();
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(addSpy).toHaveBeenCalled();
    const formData = addSpy.mock.calls[0][0] as FormData;
    expect(formData.has('imageurl')).toBe(false);
    expect(formData.has('videourl')).toBe(false);
    expect(formData.get('name')).toBe('No Files Movie');
  });

  it('should handle backend errors during submission', () => {
    component.movie.name = 'Error Movie';
    vi.spyOn(movieService, 'addMovie').mockReturnValue(throwError({ error: { message: 'Database Full' } }));
    
    component.submit();
    expect(component.message).toContain('Database Full');
  });

  it('should handle file selection', () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [mockFile] } };
    
    component.selectedImage(event);
    expect(component.imageFile).toBe(mockFile);

    const mockVideo = new File([''], 'test.mp4', { type: 'video/mp4' });
    const videoEvent = { target: { files: [mockVideo] } };
    component.selectedVideo(videoEvent);
    expect(component.videoFile).toBe(mockVideo);
  });
});
