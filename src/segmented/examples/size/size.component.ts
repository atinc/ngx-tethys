import { Component } from '@angular/core';

@Component({
    selector: 'thy-segmented-size-example',
    templateUrl: './size.component.html'
})
export class ThySegmentedSizeExampleComponent {
    sizes = [
        {
            value: 'default',
            height: 36
        },
        {
            value: 'md',
            height: 32
        },
        {
            value: 'sm',
            height: 28
        },
        {
            value: 'xs',
            height: 24
        }
    ];

    size = this.sizes[0].value;

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
}
