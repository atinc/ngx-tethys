import { Component } from '@angular/core';

@Component({
    selector: 'app-label-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyLabelBasicExampleComponent {
    public color: string;

    relationLabels = [
        {
            name: '阻塞',
            color: '#ff5b57'
        },
        {
            name: '被阻塞',
            color: '#ff5b57'
        },
        {
            name: '涉及',
            color: '#ffc442'
        },
        {
            name: '被涉及',
            color: '#ffc442'
        },
        {
            name: '重复',
            color: '#22d7bb'
        }
    ];

    constructor() {
        this.color = '#7076fa';
    }

    add() {
        console.log('add success');
    }

    remove() {
        console.log('remove success');
    }

    showMore() {
        console.log('show more menu');
    }
}
