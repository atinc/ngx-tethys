import { Component } from '@angular/core';
import { ThyProgressStackedValue } from 'ngx-tethys/progress/interfaces';

@Component({
    selector: 'thy-progress-stacked-example',
    templateUrl: './stacked.component.html'
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
    maxLessValue: ThyProgressStackedValue[] = [{ value: 0 }, { value: 20 }, { value: 20 }];
    valueEmpty: ThyProgressStackedValue[] = [{ value: 0 }];
}
