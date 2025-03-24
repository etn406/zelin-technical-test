import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookWrapperComponent } from './edit-book-wrapper.component';

describe('EditBookWrapperComponent', () => {
  let component: EditBookWrapperComponent;
  let fixture: ComponentFixture<EditBookWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
