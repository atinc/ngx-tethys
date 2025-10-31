import { Pipe, PipeTransform } from '@angular/core';
import { ThyCascaderOption } from './types';

/**
 * @private
 */
@Pipe({
    name: 'cascaderOptions'
})
export class ThyCascaderOptionsPipe implements PipeTransform {
    transform(options: ThyCascaderOption[], customOptions?: ThyCascaderOption[]) {
        if (!customOptions?.length) {
        }
        return [...customOptions, ...options];
    }
}
