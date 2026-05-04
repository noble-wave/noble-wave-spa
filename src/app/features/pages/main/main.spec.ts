import { TestBed } from '@angular/core/testing';
import { MainComponent } from './main';

describe('MainComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [MainComponent] });
    const fixture = TestBed.createComponent(MainComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
