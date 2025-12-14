import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Extreme Test Case 1: Empty Credentials
  it('should handle empty credentials gracefully', () => {
    component.loginUser.emailid = '';
    component.loginUser.password = '';
    
    const userService = TestBed.inject(UserService);
    vi.spyOn(userService, 'login').mockReturnValue(of(new User(0, '', '', '', '')));

    component.login();
    expect(component.loginUser.emailid).toBe('');
  });

  // Extreme Test Case 2: Very Long Strings
  it('should handle extremely long email/password inputs', () => {
    const longString = 'a'.repeat(10000);
    component.loginUser.emailid = longString + '@test.com';
    component.loginUser.password = longString;

    const userService = TestBed.inject(UserService);
    vi.spyOn(userService, 'login').mockReturnValue(of(new User(1, 'Long User', '', longString + '@test.com', 'user')));

    expect(() => component.login()).not.toThrow();
  });

  // Extreme Test Case 3: Special Characters / XSS Payloads
  it('should handle special characters and potential XSS payloads', () => {
    const xssPayload = '<script>alert("xss")</script>';
    component.loginUser.emailid = xssPayload;
    
    const userService = TestBed.inject(UserService);
    vi.spyOn(userService, 'login').mockReturnValue(throwError({ error: { Message: 'Invalid email' } }));

    component.login();
    expect(component.loginerror).toBe('Invalid email');
  });

  // Extreme Test Case 4: SQL Injection Patterns
  it('should handle SQL injection strings', () => {
    const sqlInjection = "' OR '1'='1";
    component.loginUser.emailid = sqlInjection;
    component.loginUser.password = sqlInjection;

    const userService = TestBed.inject(UserService);
    vi.spyOn(userService, 'login').mockReturnValue(throwError({ error: { Message: 'Login failed' } }));

    component.login();
    expect(component.loginerror).toBe('Login failed');
  });
});
