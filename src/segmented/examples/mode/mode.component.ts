import { Component } from '@angular/core';

@Component({
    selector: 'thy-segmented-mode-example',
    templateUrl: './mode.component.html'
})
export class ThySegmentedModeExampleComponent {
    options = ['我', '成员', '部门', '用户组', '整个公司', '我是一个很长很长很长很长的选项'];
}
