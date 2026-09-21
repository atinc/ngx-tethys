import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyProgressStackedValue, ThyProgress } from 'ngx-tethys/progress';

@Component({
    selector: 'thy-progress-text-example',
    templateUrl: './text.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyProgress]
})
export class ThyProgressTextExampleComponent {
    value = 40;

    stackedValues: ThyProgressStackedValue[] = [
        {
            color: 'success',
            value: 20,
            label: 'success'
        },
        {
            color: 'warning',
            value: 20,
            label: 'warning'
        },
        {
            color: 'danger',
            value: 20,
            label: 'danger'
        },
        {
            color: 'info',
            value: 30,
            label: 'info'
        }
    ];
}
