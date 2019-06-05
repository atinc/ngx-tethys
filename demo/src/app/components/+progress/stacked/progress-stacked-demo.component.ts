import { Component } from '@angular/core';

@Component({
    selector: 'app-progress-stacked-demo',
    templateUrl: './progress-stacked-demo.component.html'
})
export class ProgressStackedDemoComponent {
    max = 100;

    size = 'md';

    value = [
        // {
        //     type: 'info',
        //     value: 20
        // },
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
