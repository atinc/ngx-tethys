import { Component } from '@angular/core';
import { ThyTableColumnSkeletonType, ThyTableTheme } from 'ngx-tethys/table';

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

    columns = [
        { width: '300px', type: ThyTableColumnSkeletonType.title },
        { width: 'auto', type: ThyTableColumnSkeletonType.default },
        { width: 'auto', type: ThyTableColumnSkeletonType.default },
        { width: 'auto', type: ThyTableColumnSkeletonType.default },
        { width: 250, type: ThyTableColumnSkeletonType.member }
    ];
}
