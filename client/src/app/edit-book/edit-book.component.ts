import { Component, inject, model, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Book } from '../../entities/book.schema';
import { BookService } from '../../services/book.service';
import { AlertService } from '../alert.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';

/**
 * This component is used to edit a book,
 * or to create a new book if the input `[book]` is not provided.
 */
@Component({
  selector: 'app-edit-book',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatSliderModule,
    StarRatingComponent,
    MatProgressSpinnerModule,
    MatBadgeModule,
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss',
})
export class EditBookComponent {
  private readonly alertService = inject(AlertService);
  readonly bookService = inject(BookService);

  readonly book = model.required<Book>();

  readonly isLoading = signal(false);

  readonly title = new FormControl('', { nonNullable: true });
  readonly author_name = new FormControl('', { nonNullable: true });
  readonly isbn = new FormControl('');
  readonly rating = new FormControl(0);

  readonly form = new FormGroup({
    title: this.title,
    author_name: this.author_name,
    isbn: this.isbn,
    rating: this.rating,
  });

  ngOnInit(): void {
    this.applyBookDataToFormFields();
  }

  onSubmit(): void {
    this.form.disable();
    this.isLoading.set(true);

    this.bookService
      .updateBook(this.book().id, {
        title: this.title.value,
        author_name: this.author_name.value,
        isbn: this.isbn.value,
        note: this.rating.value,
      })
      .subscribe({
        next: (book) => {
          this.book.set(book);
          this.form.markAsPristine();
          this.alertService.info('Changes saved successfully');
        },
        error: () => {
          this.alertService.error("Changes couldn't be saved");
          this.form.enable();
          this.isLoading.set(false);
        },
        complete: () => {
          console.log('complete');
          this.form.enable();
          this.isLoading.set(false);
        },
      });
  }

  onReset(): void {
    this.applyBookDataToFormFields();
    this.form.markAsPristine();
  }

  private applyBookDataToFormFields(): void {
    this.title.setValue(this.book().title);
    this.author_name.setValue(this.book().author_name);
    this.isbn.setValue(this.book().isbn);
    this.rating.setValue(this.book().note);
  }
}
