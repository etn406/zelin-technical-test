import { Routes } from '@angular/router';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { bookResolver } from './book.resolver';
import { BooksTableComponent } from './books-table/books-table.component';

export const routes: Routes = [
  { path: 'books', component: BooksTableComponent, title: 'All Books' },

  {
    path: 'books/add',
    component: AddOrEditBookComponent,
    title: 'Add a book',
  },

  {
    path: 'books/:id',
    component: AddOrEditBookComponent,
    resolve: { book: bookResolver },
    title: 'Edit a book',
  },

  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
