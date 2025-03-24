import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly snackBar = inject(MatSnackBar);

  /**
   * Display an info message to the user
   */
  public info(message: string, closeButtonLabel = 'OK'): void {
    this.snackBar.open(message, closeButtonLabel);
  }

  /**
   * Display an error message to the user
   */
  public error(message: string, closeButtonLabel = 'OK'): void {
    this.snackBar.open(message, closeButtonLabel, {
      panelClass: ['error'],
    });
  }
}
