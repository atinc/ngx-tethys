import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isValidModelValue' })
export class GridIsValidModelValuePipe implements PipeTransform {
    transform(value: any): boolean {
        return value !== '' && value !== undefined && value !== null;
    }
}
