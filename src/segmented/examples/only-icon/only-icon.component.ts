import { Component } from '@angular/core';

@Component({
    selector: 'thy-segmented-only-icon-example',
    templateUrl: './only-icon.component.html'
})
export class ThySegmentedOnlyIconExampleComponent {
    options = [{ icon: 'list' }, { icon: 'paperclip' }];

    options2 = [
        { icon: 'list', tooltip: '列表' },
        { icon: 'paperclip', tooltip: '对齐' }
    ];
}
