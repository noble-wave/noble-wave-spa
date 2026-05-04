import { TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [DetailsComponent] });
    const fixture = TestBed.createComponent(DetailsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
