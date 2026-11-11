import { Component } from '@angular/core';
import { ThySegment, ThySegmentItem } from 'ngx-tethys/segment';

@Component({
    selector: 'thy-segment-mode-example',
    templateUrl: './mode.component.html',
    imports: [ThySegment, ThySegmentItem]
})
export class ThySegmentModeExampleComponent {
    items = [
        { value: 'me', text: '我' },
        { value: 'member', text: '成员' },
        { value: 'department', text: '部门' },
        { value: 'group', text: '用户组' },
        { value: 'company', text: '整个公司' },
        { value: 'other', text: '我是一个很长很长很长很长的选项' }
    ];
}
