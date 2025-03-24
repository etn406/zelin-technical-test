import { Routes } from '@angular/router';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { bookResolver } from './book.resolver';
import { BooksTableComponent } from './books-table/books-table.component';

export const routes: Routes = [
  { path: 'books', component: BooksTableComponent },

  {
    path: 'books/add',
    component: AddOrEditBookComponent,
    resolve: {},
  },

  {
    path: 'books/:id',
    component: AddOrEditBookComponent,
    resolve: { book: bookResolver },
  },

  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
