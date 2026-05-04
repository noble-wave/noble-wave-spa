import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { APP_CONFIG } from './config';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AppComponent] }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose the configured app name as title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual(APP_CONFIG.appName);
  });
});
