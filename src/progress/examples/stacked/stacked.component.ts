import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyProgress, ThyProgressStackedValue } from 'ngx-tethys/progress';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-progress-stacked-example',
    templateUrl: './stacked.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyProgress, ThySpace, ThySpaceItemDirective]
})
export class ThyProgressStackedExampleComponent {
    max = 90;

    maxEmpty = 0;

    value = [
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
        },
        {
            value: 30,
            color: '#2cccda'
        },
        {
            value: 10,
            color: '#ddd'
        }
    ];
    maxLessValue: ThyProgressStackedValue[] = [
        { value: 0, color: 'primary' },
        { value: 20, color: 'success' },
        { value: 20, color: 'info' }
    ];
    valueEmpty: ThyProgressStackedValue[] = [{ value: 0 }];
}
