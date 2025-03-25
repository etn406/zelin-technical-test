import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';

/**
 * Signal that indicates if the current device is a handset
 */
export function getHandsetSignal() {
  return toSignal(
    inject(BreakpointObserver)
      .observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches),
        shareReplay()
      ),
    { initialValue: false }
  );
}
