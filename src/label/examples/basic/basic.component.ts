import { Component } from '@angular/core';

@Component({
    selector: 'app-label-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyLabelBasicExampleComponent {
    relationLabels = [
        {
            name: '阻塞',
            color: '#ff5b57',
            size: 'sm'
        },
        {
            name: '被阻塞',
            color: '#ff5b57',
            size: 'default'
        },
        {
            name: '涉及',
            color: '#ffc442',
            size: 'md'
        },
        {
            name: '被涉及',
            color: '#ffc442',
            size: 'lg'
        },
        {
            name: '重复',
            color: '#22d7bb',
            size: 'lg'
        }
    ];

    constructor() {}
}
