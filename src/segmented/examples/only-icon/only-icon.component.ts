import { Component } from '@angular/core';

@Component({
    selector: 'thy-segmented-only-icon-example',
    templateUrl: './only-icon.component.html'
})
export class ThySegmentedOnlyIconExampleComponent {
    onlyIconOptions = [{ icon: 'list' }, { icon: 'paperclip' }];

    hasTooltipOptions = [
        { icon: 'list', tooltip: '列表' },
        { icon: 'paperclip', tooltip: '对齐' }
    ];
}
