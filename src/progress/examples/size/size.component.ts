import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyProgress } from 'ngx-tethys/progress';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-progress-size-example',
    templateUrl: './size.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyProgress, ThySpace, ThySpaceItemDirective]
})
export class ThyProgressSizeExampleComponent {
    value = 40;

    max = 100;

    stackedValues = [
        {
            color: 'success',
            value: 20
        },
        {
            color: 'warning',
            value: 20
        },
        {
            color: 'danger',
            value: 20
        },
        {
            color: 'info',
            value: 30
        }
    ];
}
