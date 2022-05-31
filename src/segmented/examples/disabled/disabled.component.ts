import { Component } from '@angular/core';
import { ThySegmentedEvent } from 'ngx-tethys/segmented';

@Component({
    selector: 'thy-segmented-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThySegmentedDisabledExampleComponent {
    options1 = [
        { value: 1, labelText: '成员' },
        { value: 2, labelText: '部门' },
        { value: 3, labelText: '用户组' }
    ];

    options2 = [
        { value: 1, labelText: '列表', icon: 'list' },
        { value: 2, labelText: '对齐', icon: 'paperclip' }
    ];

    options3 = [
        { value: 'list', icon: 'list' },
        { value: 'paperclip', icon: 'paperclip' }
    ];

    options4 = [
        { value: 1, labelText: '成员', disabled: true },
        { value: 2, labelText: '部门' },
        { value: 3, labelText: '用户组', disabled: true }
    ];

    options5 = [
        { value: 'list', icon: 'list', disabled: true },
        { value: 'paperclip', icon: 'paperclip' }
    ];

    options6 = [
        { value: 'list', icon: 'list' },
        { value: 'paperclip', icon: 'paperclip', disabled: true }
    ];

    selectedOptionChange(event: ThySegmentedEvent): void {}
}
