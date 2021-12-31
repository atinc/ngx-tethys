import { Component } from '@angular/core';
import { ThyStackedValue } from 'ngx-tethys/progress/interfaces';

@Component({
    selector: 'thy-progress-stacked-example',
    templateUrl: './stacked.component.html'
})
export class ThyProgressStackedExampleComponent {
    max = 90;

    maxEmpty = 0;

    size = 'md';

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
            value: 30,
            label: 'custom color'
        },
        {
            value: 10,
            color: '#ddd'
        }
    ];
    maxLessValue: ThyStackedValue[] = [{ value: 0 }, { value: 20 }, { value: 20 }];
    valueEmpty: ThyStackedValue[] = [{ value: 0 }];
}
