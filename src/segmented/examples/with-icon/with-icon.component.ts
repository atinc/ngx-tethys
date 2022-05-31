import { Component } from '@angular/core';

@Component({
    selector: 'thy-segmented-with-icon-example',
    templateUrl: './with-icon.component.html'
})
export class ThySegmentedWithIconExampleComponent {
    options = [
        { value: 1, labelText: '列表', icon: 'list' },
        { value: 2, labelText: '对齐', icon: 'paperclip' }
    ];
}
