
import { Component } from '@angular/core';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThySegment, ThySegmentItem } from 'ngx-tethys/segment';

@Component({
    selector: 'thy-segment-size-example',
    templateUrl: './size.component.html',
    imports: [ThySegment, ThySegmentItem, ThyButtonGroup, ThyButton]
})
export class ThySegmentSizeExampleComponent {
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
}
