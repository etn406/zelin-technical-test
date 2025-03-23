import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct amount of full stars', () => {
    component.value.set(3);
    fixture.detectChanges();

    const $stars = fixture.nativeElement.querySelectorAll('.mat-icon');
    expect($stars.length).toBe(5);
    expect($stars[0]).toContain('star');
    expect($stars[1]).toContain('star_half');
    expect($stars[2]).toContain('star_border');
    expect($stars[3]).toContain('star_border');
    expect($stars[4]).toContain('star_border');
  });

  it('should display only empty stars when 0', () => {
    component.value.set(0);
    fixture.detectChanges();

    const $stars = fixture.nativeElement.querySelectorAll('.mat-icon');
    expect($stars.length).toBe(5);
    expect($stars[0]).toContain('star_border');
    expect($stars[1]).toContain('star_border');
    expect($stars[2]).toContain('star_border');
    expect($stars[3]).toContain('star_border');
    expect($stars[4]).toContain('star_border');
  });

  it('should display only full stars when 10', () => {
    component.value.set(10);
    fixture.detectChanges();

    const $stars = fixture.nativeElement.querySelectorAll('.mat-icon');
    expect($stars.length).toBe(5);
    expect($stars[0]).toContain('star_');
    expect($stars[1]).toContain('star_');
    expect($stars[2]).toContain('star_');
    expect($stars[3]).toContain('star_');
    expect($stars[4]).toContain('star_');
  });
});
