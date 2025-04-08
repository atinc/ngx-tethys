import { Component } from '@angular/core';
import { ThyProgress } from 'ngx-tethys/progress';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-progress-size-example',
    templateUrl: './size.component.html',
    imports: [ThyProgress, ThySpace, ThySpaceItemDirective]
})
export class ThyProgressSizeExampleComponent {
    value = 40;

    max = 100;

    stackedValues = [
        {
            type: 'success',
            value: 20
        },
        {
            type: 'warning',
            value: 20
        },
        {
            type: 'danger',
            value: 20
        },
        {
            type: 'info',
            value: 30
        }
    ];
}
