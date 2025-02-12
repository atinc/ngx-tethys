import { Component } from '@angular/core';

@Component({
    selector: 'thy-segment-size-example',
    templateUrl: './size.component.html',
    standalone: false
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
