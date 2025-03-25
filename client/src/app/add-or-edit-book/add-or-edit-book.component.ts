import { BreakpointObserver } from '@angular/cdk/layout';
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
  Validators,
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
import { InsertOrUpdateBookData } from '../../entities/insert-or-update-book.type';
import { BookService } from '../../services/book.service';
import { getHandsetSignal } from '../../utils/get-handset-signal';
import { AlertService } from '../alert.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';

/**
 * This component is used to edit a book,
 * or to create a new book if the input `[book]` is not provided.
 */
@Component({
  selector: 'app-add-or-edit-book',
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
  templateUrl: './add-or-edit-book.component.html',
  styleUrl: './add-or-edit-book.component.scss',
})
export class AddOrEditBookComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookService);

  readonly book = model<Book>();

  readonly isHandset = getHandsetSignal();
  readonly doesExistInDB = computed(() => this.book()?.id !== undefined);
  readonly isLoading = signal(false);
  readonly isDeleted = computed(() => this.book()?.deleted ?? false);
  readonly isFormDisabled = computed(
    () => this.isLoading() || this.isDeleted()
  );

  readonly title = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.minLength(1),
      Validators.maxLength(255),
      Validators.required,
    ],
  });

  readonly author_name = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.minLength(1),
      Validators.maxLength(255),
      Validators.required,
    ],
  });

  readonly isbn = new FormControl('', {
    validators: [Validators.maxLength(20)],
  });

  readonly rating = new FormControl(0, {
    nonNullable: true,
  });

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
    const book = this.book();

    if (book?.id !== undefined) {
      this.updateBook(book.id);
    } else {
      this.insertBook();
    }
  }

  onClickOnReset(): void {
    this.applyBookDataToFormFields();
  }

  onClickOnDelete(id: number): void {
    this.isLoading.set(true);

    // Resetting modified fields
    this.applyBookDataToFormFields();

    this.bookService.markBookAsDeleted(id).subscribe({
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

  onClickOnRestore(id: number): void {
    this.isLoading.set(true);
    this.bookService.restoreDeletedBook(id).subscribe({
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

  onClickOnDefinitelyDelete(id: number): void {
    this.isLoading.set(true);

    this.bookService.definitelyDeleteBook(id).subscribe({
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

  setRating(value: number): void {
    this.rating.setValue(value);
    this.rating.markAsDirty();
  }

  private applyBookDataToFormFields(): void {
    const book = this.book();

    this.title.setValue(book?.title ?? '');
    this.author_name.setValue(book?.author_name ?? '');
    this.isbn.setValue(book?.isbn ?? '');
    this.rating.setValue(book?.note ?? 0);
    this.form.markAsPristine();
  }

  private getFormFieldsAsBookData(): InsertOrUpdateBookData {
    return {
      title: this.title.value,
      author_name: this.author_name.value,
      isbn: this.isbn.value,
      note: this.rating.value,
    };
  }

  private updateBook(id: number): void {
    this.isLoading.set(true);

    this.bookService.updateBook(id, this.getFormFieldsAsBookData()).subscribe({
      next: (book: Book) => {
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

  private insertBook(): void {
    this.isLoading.set(true);

    this.bookService.insertBook(this.getFormFieldsAsBookData()).subscribe({
      next: (book: Book) => {
        this.book.set(book);
        this.applyBookDataToFormFields();
        this.alertService.info('The new book has been saved successfully');
        this.isLoading.set(false);
        this.router.navigate(['/books', book.id]);
      },
      error: () => {
        this.alertService.error("The new book couldn't be saved");
        this.isLoading.set(false);
      },
    });
  }
}
