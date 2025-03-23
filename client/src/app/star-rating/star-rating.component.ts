import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

enum StarIcon {
  Full = 'star',
  Half = 'star_half',
  Empty = 'star_border',
}

function getIcon(value: number, n: number): StarIcon {
  return value < n - 1
    ? StarIcon.Empty
    : value < n
    ? StarIcon.Half
    : StarIcon.Full;
}

@Component({
  selector: 'app-star-rating',
  imports: [MatIcon],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
  /**
   * Value of the rating
   */
  public value = model.required<number>();

  public starsIcons = computed(() => {
    const v = this.value();
    return [
      getIcon(v, 2),
      getIcon(v, 4),
      getIcon(v, 6),
      getIcon(v, 8),
      getIcon(v, 10),
    ];
  });
}
