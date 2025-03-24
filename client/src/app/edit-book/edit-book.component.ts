import {
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
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
    MatChipsModule,
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss',
})
export class EditBookComponent {
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookService);

  readonly book = model.required<Book>();

  readonly isLoading = signal(false);
  readonly isDeleted = computed(() => this.book().deleted);
  readonly isFormDisabled = computed(
    () => this.isLoading() || this.isDeleted()
  );

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

  constructor() {
    effect(() => {
      if ((this.isDeleted() || this.isLoading()) && !this.form.disabled) {
        this.form.disable();
      } else if (!this.isDeleted() && !this.isLoading() && this.form.disabled) {
        this.form.enable();
      }
    });
  }

  ngOnInit(): void {
    this.applyBookDataToFormFields();
  }

  onSubmit(): void {
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
          this.applyBookDataToFormFields();
          this.alertService.info('Changes saved successfully');
          this.isLoading.set(false);
        },
        error: () => {
          this.alertService.error("Changes couldn't be saved");
          this.isLoading.set(false);
        },
      });
  }

  onClickOnReset(): void {
    this.applyBookDataToFormFields();
  }

  onClickOnDelete(): void {
    this.isLoading.set(true);

    // Resetting modified fields
    this.applyBookDataToFormFields();

    this.bookService.markBookAsDeleted(this.book().id).subscribe({
      next: (book) => {
        this.alertService.info('Book deleted successfully');
        this.book.set(book);
        this.applyBookDataToFormFields();
        this.isLoading.set(false);
      },
      error: () => {
        this.alertService.error("Book couldn't be deleted");
        this.isLoading.set(false);
      },
    });
  }

  onClickOnRestore(): void {
    this.isLoading.set(true);
    this.bookService.restoreDeletedBook(this.book().id).subscribe({
      next: (book) => {
        this.alertService.info('Book restored successfully');
        this.book.set(book);
        this.applyBookDataToFormFields();
        this.isLoading.set(false);
      },
      error: () => {
        this.alertService.error("Book couldn't be restored");
        this.isLoading.set(false);
      },
    });
  }

  onClickOnDefinitelyDelete(): void {
    this.isLoading.set(true);

    this.bookService.definitelyDeleteBook(this.book().id).subscribe({
      next: (book) => {
        this.alertService.info('Book definitely deleted successfully');
        this.isLoading.set(false);
        this.router.navigate(['']);
      },
      error: () => {
        this.alertService.error("Book couldn't be definitely deleted");
        this.isLoading.set(false);
      },
    });
  }

  private applyBookDataToFormFields(): void {
    this.title.setValue(this.book().title);
    this.author_name.setValue(this.book().author_name);
    this.isbn.setValue(this.book().isbn);
    this.rating.setValue(this.book().note);
    this.form.markAsPristine();
  }
}
