import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

enum StarIcon {
  Full = 'star',
  Half = 'star_half',
  Empty = 'star_border',
}

@Component({
  selector: 'app-star-rating',
  imports: [MatIcon],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
  readonly value = model.required<number>();
  readonly small = input<boolean>(false);

  readonly correctedValue = computed(() =>
    Math.max(0, Math.min(10, Math.round(this.value())))
  );

  // Internal rating value are between 0 and 10, but the user sees it between 0 and 5 (with half .5)
  readonly humanizedValue = computed(() => this.correctedValue() / 2);

  readonly star1 = computed<StarIcon>(() => this.getIcon(this.value(), 2));
  readonly star2 = computed<StarIcon>(() => this.getIcon(this.value(), 4));
  readonly star3 = computed<StarIcon>(() => this.getIcon(this.value(), 6));
  readonly star4 = computed<StarIcon>(() => this.getIcon(this.value(), 8));
  readonly star5 = computed<StarIcon>(() => this.getIcon(this.value(), 10));

  private getIcon(value: number, n: number): StarIcon {
    return value < n - 1
      ? StarIcon.Empty
      : value < n
      ? StarIcon.Half
      : StarIcon.Full;
  }
}
