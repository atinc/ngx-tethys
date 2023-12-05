import { Pipe, PipeTransform } from '@angular/core';

/**
 * @private
 */
@Pipe({
    name: 'isValidModelValue',
    standalone: true
})
export class TableIsValidModelValuePipe implements PipeTransform {
    transform(value: any): boolean {
        return value !== '' && value !== undefined && value !== null;
    }
}
