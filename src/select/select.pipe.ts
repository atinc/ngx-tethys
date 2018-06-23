import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectSearchFilter' })
export class SelectSearchFilterPipe implements PipeTransform {
    transform(name: string): any {

    }
}


export const SelectPipes = [
    SelectSearchFilterPipe
];
