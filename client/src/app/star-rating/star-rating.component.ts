import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

enum StarIcon {
  Full = 'star',
  Half = 'star_half',
  Empty = 'star_border',
}

@Component({
  selector: 'app-star-rating',
  imports: [MatIcon, MatButtonModule, MatMenuModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
  /**
   * Displays a smaller version of the rating
   */
  readonly small = input<boolean>(false);

  /**
   * Rating between 0 and 10 (included)
   */
  readonly value = model.required<number>();

  // List of the icons to use  to represent the value
  readonly icons = computed<StarIcon[]>(() => this.getIcons(this.value()));

  /**
   * Get the 5 icons names for the given value.
   */
  public getIcons(value: number): StarIcon[] {
    return [2, 4, 6, 8, 10].map((n) =>
      value < n - 1 ? StarIcon.Empty : value < n ? StarIcon.Half : StarIcon.Full
    );
  }

  /**
   * Internal rating value are between 0 and 10,
   * but the user sees it between 0 and 5 (with half .5)
   */
  public humanizeValue(value: number): string {
    return `${Math.max(0, Math.min(10, Math.round(value))) / 2}`;
  }

  public onClickOnNewValue(value: number): void {
    this.value.set(value);
  }
}
