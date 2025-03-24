import { inject, Injectable, isDevMode } from '@angular/core';
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
   * Display an error message to the user.
   * Details are displayed only in development mode
   */
  public error(
    message: string,
    details: string = '',
    closeButtonLabel = 'OK'
  ): void {
    this.snackBar.open(
      message + (isDevMode() ? details : ''),
      closeButtonLabel,
      {
        panelClass: ['error'],
      }
    );
  }
}
