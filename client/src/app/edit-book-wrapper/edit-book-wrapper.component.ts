import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../entities/book.schema';
import { AddOrEditBookComponent } from '../add-or-edit-book/add-or-edit-book.component';

@Component({
  selector: 'app-edit-book-wrapper',
  imports: [AddOrEditBookComponent, MatProgressSpinnerModule],
  templateUrl: './edit-book-wrapper.component.html',
  styleUrl: './edit-book-wrapper.component.scss',
})
export class EditBookWrapperComponent {
  readonly activatedRoute = inject(ActivatedRoute);

  readonly isLoading = signal(true);

  readonly book = signal<Book | null>(null);

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ book }) => {
      this.book.set(book);
      this.isLoading.set(false);
    });
  }
}
