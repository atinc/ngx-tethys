import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isValidModelValue',
    standalone: true
})
export class TableIsValidModelValuePipe implements PipeTransform {
    transform(value: any): boolean {
        return value !== '' && value !== undefined && value !== null;
    }
}
