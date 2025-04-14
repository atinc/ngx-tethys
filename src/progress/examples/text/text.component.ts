import { Component } from '@angular/core';
import { ThyStackedValue, ThyProgress } from 'ngx-tethys/progress';

@Component({
    selector: 'thy-progress-text-example',
    templateUrl: './text.component.html',
    imports: [ThyProgress]
})
export class ThyProgressTextExampleComponent {
    value = 40;

    stackedValues: ThyStackedValue[] = [
        {
            type: 'success',
            value: 20,
            label: 'success'
        },
        {
            type: 'warning',
            value: 20,
            label: 'warning'
        },
        {
            type: 'danger',
            value: 20,
            label: 'danger'
        },
        {
            type: 'info',
            value: 30,
            label: 'info'
        }
    ];
}
