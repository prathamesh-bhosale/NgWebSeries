import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesComponent } from './series.component';
import { CategoryService } from 'src/app/services/category.service';
import { SeriesService } from 'src/app/services/series.service';
import { LanguageService } from 'src/app/services/language.service';
import { EpisodeService } from 'src/app/services/episode.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Series } from 'src/app/models/series';

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let fixture: ComponentFixture<SeriesComponent>;
  let seriesService: jasmine.SpyObj<SeriesService>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let languageService: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    const seriesServiceSpy = jasmine.createSpyObj('SeriesService', ['addSeries', 'getAllSeriess', 'deleteSeries', 'getAbsolutePath']);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);
    const languageServiceSpy = jasmine.createSpyObj('LanguageService', ['getAllLanguages']);
    const episodeServiceSpy = jasmine.createSpyObj('EpisodeService', ['getEpisodes']);

    await TestBed.configureTestingModule({
      declarations: [ SeriesComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        { provide: SeriesService, useValue: seriesServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: EpisodeService, useValue: episodeServiceSpy }
      ]
    })
    .compileComponents();

    seriesService = TestBed.inject(SeriesService) as jasmine.SpyObj<SeriesService>;
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    languageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;

    // Mock the service calls in ngOnInit
    categoryService.getAllCategories.and.returnValue(of([]));
    seriesService.getAllSeriess.and.returnValue(of([]));
    languageService.getAllLanguages.and.returnValue(of([]));

    fixture = TestBed.createComponent(SeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    beforeEach(() => {
      // Mock data that is required for submit() to not throw errors
      component.series.name = 'Test Series';
      component.series.categories = 'Test Category';
      component.series.language = 'English';
      component.series.story = 'Test Story';
      component.imageFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      component.videoFile = new File([''], 'test.mp4', { type: 'video/mp4' });
      seriesService.addSeries.and.returnValue(of({ id: 1, name: 'Test Series', categories: 'Test Category', language: 'English', story: 'Test Story', forkid: '1', imageurl: '', videourl: '' }));
    });

    it('should append "1" to forkid when series.forkid is truthy', () => {
      // Arrange
      component.series.forkid = true as any;

      // Act
      component.submit();

      // Assert
      expect(seriesService.addSeries).toHaveBeenCalled();
      const formData = seriesService.addSeries.calls.mostRecent().args[0] as FormData;
      expect(formData.get('forkid')).toBe('1');
    });

    it('should append "0" to forkid when series.forkid is falsy (null)', () => {
      // Arrange
      component.series.forkid = null;

      // Act
      component.submit();

      // Assert
      expect(seriesService.addSeries).toHaveBeenCalled();
      const formData = seriesService.addSeries.calls.mostRecent().args[0] as FormData;
      expect(formData.get('forkid')).toBe('0');
    });

    it('should append "0" to forkid when series.forkid is false', () => {
        // Arrange
        component.series.forkid = false as any;

        // Act
        component.submit();

        // Assert
        expect(seriesService.addSeries).toHaveBeenCalled();
        const formData = seriesService.addSeries.calls.mostRecent().args[0] as FormData;
        expect(formData.get('forkid')).toBe('0');
      });
  });
});