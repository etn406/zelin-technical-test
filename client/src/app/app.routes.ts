import { Routes } from '@angular/router';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { AllBooksPageComponent } from './all-books-page/all-books-page.component';
import { bookResolver } from './book.resolver';

export const routes: Routes = [
  { path: 'books', component: AllBooksPageComponent, title: 'All Books' },

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
