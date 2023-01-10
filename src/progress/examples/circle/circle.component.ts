import { Component } from '@angular/core';

@Component({
    selector: 'thy-progress-circle-example',
    templateUrl: './circle.component.html',
    styleUrls: ['./circle.component.scss']
})
export class ThyProgressCircleExampleComponent {
    value = 70;

    values = [
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
}
