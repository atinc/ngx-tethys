import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterGroupData'
})
export class FilterGroupDataPipe implements PipeTransform {
    transform(allData: [], groupId: string): any {
        return allData.filter(item => item['groupId'] === groupId);
    }
}
