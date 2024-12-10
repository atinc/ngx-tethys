import { Component } from '@angular/core';

@Component({
    selector: 'thy-progress-size-example',
    templateUrl: './size.component.html',
    standalone: false
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
