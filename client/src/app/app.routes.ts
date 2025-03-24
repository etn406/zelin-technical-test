import { Routes } from '@angular/router';
import { bookResolver } from './book.resolver';
import { BooksTableComponent } from './books-table/books-table.component';
import { EditBookWrapperComponent } from './edit-book-wrapper/edit-book-wrapper.component';

export const routes: Routes = [
  { path: 'books', component: BooksTableComponent },
  {
    path: 'books/:id/edit',
    component: EditBookWrapperComponent,
    resolve: { book: bookResolver },
  },

  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
