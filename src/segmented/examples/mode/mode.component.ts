import { Component } from '@angular/core';

@Component({
    selector: 'thy-segmented-mode-example',
    templateUrl: './mode.component.html'
})
export class ThySegmentedModeExampleComponent {
    items = [
        { value: 'me', text: '我' },
        { value: 'member', text: '成员' },
        { value: 'department', text: '部门' },
        { value: 'group', text: '用户组' },
        { value: 'company', text: '整个公司' },
        { value: 'other', text: '我是一个很长很长很长很长的选项' }
    ];
}
