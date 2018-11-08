import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectSearchFilter' })
export class SelectSearchFilterPipe implements PipeTransform {
    transform(value: any): any {
        console.log(value);
    }
}


export const SelectPipes = [
    SelectSearchFilterPipe
];
