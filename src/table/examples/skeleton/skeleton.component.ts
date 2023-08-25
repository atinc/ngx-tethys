import { Component } from '@angular/core';
import { ThyTableColumnSkeletonType, ThyTableSize, ThyTableSkeletonColumn, ThyTableTheme } from 'ngx-tethys/table';

@Component({
    selector: 'thy-table-skeleton-example',
    templateUrl: './skeleton.component.html'
})
export class ThyTableSkeletonExampleComponent {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    theme: ThyTableTheme = 'default';

    sizes: { value: ThyTableSize; height: number }[] = [
        {
            value: 'xs',
            height: 44
        },
        {
            value: 'sm',
            height: 48
        },
        {
            value: 'md',
            height: 52
        },
        {
            value: 'lg',
            height: 56
        },
        {
            value: 'xlg',
            height: 60
        }
    ];

    size: ThyTableSize = 'md';

    columns: ThyTableSkeletonColumn[] = [
        { width: '40%', type: ThyTableColumnSkeletonType.title },
        { width: 'auto', type: ThyTableColumnSkeletonType.default },
        { width: 'auto', type: ThyTableColumnSkeletonType.default },
        { width: 'auto', type: ThyTableColumnSkeletonType.default },
        { width: '17%', type: ThyTableColumnSkeletonType.member }
    ];
}
