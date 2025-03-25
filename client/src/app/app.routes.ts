import { Routes } from '@angular/router';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { AllBooksPageComponent } from './all-books-page/all-books-page.component';
import { bookResolver } from './book.resolver';
import { DeletedBooksPageComponent } from './deleted-books-page/deleted-books-page.component';

export const routes: Routes = [
  { path: 'books', component: AllBooksPageComponent, title: 'All Books' },

  {
    path: 'books/deleted',
    component: DeletedBooksPageComponent,
    title: 'Deleted Books',
  },

  {
    path: 'books/add',
    component: AddOrEditBookComponent,
    title: 'Add a Book',
  },

  {
    path: 'books/:id',
    component: AddOrEditBookComponent,
    resolve: { book: bookResolver },
    title: 'Edit a Book',
  },

  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
