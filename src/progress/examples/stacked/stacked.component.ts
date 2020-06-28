import { Component } from '@angular/core';

@Component({
    selector: 'app-progress-stacked-example',
    templateUrl: './stacked.component.html'
})
export class ThyProgressStackedExampleComponent {
    max = 100;

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
            color: '#7076fa',
            label: 'custom color'
        }
    ];
}
