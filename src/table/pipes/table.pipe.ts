import { Pipe, PipeTransform } from '@angular/core';

/**
 * @private
 */
@Pipe({
    name: 'isValidModelValue'
})
export class TableIsValidModelValuePipe implements PipeTransform {
    transform(value: any): boolean {
        return value !== '' && value !== undefined && value !== null;
    }
}
