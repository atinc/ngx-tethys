import { Component } from '@angular/core';
import { ThyProgress, ThyProgressStackedValue } from 'ngx-tethys/progress';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-progress-stacked-example',
    templateUrl: './stacked.component.html',
    imports: [ThyProgress, ThySpace, ThySpaceItemDirective]
})
export class ThyProgressStackedExampleComponent {
    max = 90;

    maxEmpty = 0;

    value = [
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
        { value: 0, type: 'primary' },
        { value: 20, type: 'success' },
        { value: 20, type: 'info' }
    ];
    valueEmpty: ThyProgressStackedValue[] = [{ value: 0 }];
}
