import { Component } from '@angular/core';
import { ThySegmentedEvent } from 'ngx-tethys/segmented';

@Component({
    selector: 'thy-segmented-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySegmentedBasicExampleComponent {
    options = [
        { value: 1, labelText: '你' },
        { value: 2, labelText: '我' },
        { value: 3, labelText: '她' },
        { value: 4, labelText: '他' }
    ];

    options2 = ['成员', '部门', '用户组'];

    options3 = [10, 100, 1000, 10000, 100000];

    selectedIndex: number = 0;

    selectedChange(event: ThySegmentedEvent): void {}

    onSelectedChange(event: number): void {}
}
