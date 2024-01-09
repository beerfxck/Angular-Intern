import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || isNaN(value)) {
      return '';
    }

    if (Math.abs(value) >= 10000000000) {
      return (value / 1000000000) + 'B';

    } else if (Math.abs(value) >= 1000000000) {
        return (value / 1000000000) + 'B';

    } else if (Math.abs(value) >= 100000000) {
      return (value / 10000000) + 'M';

    } else if (Math.abs(value) >= 10000000) {
        return (value / 1000000) + 'M';

    } else if (Math.abs(value) >= 1000000) {
        return (value / 1000000) + 'M';

    } else if (Math.abs(value) >= 1000000) {
        return (value / 1000) + 'K';

    } else if (Math.abs(value) >= 10000) {
        return (value / 1000) + 'K';

    } else if (Math.abs(value) >= 1000) {
      return (value / 1000) + 'K';
      
    } else {
      return value.toString();
    }
  }
}
