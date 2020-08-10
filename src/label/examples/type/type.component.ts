import { Component } from '@angular/core';

@Component({
    selector: 'app-label-type-example',
    templateUrl: './type.component.html'
})
export class ThyLabelTypeExampleComponent {
    statusLabels = [
        {
            name: '未开始',
            icon: 'minus-circle',
            color: '#fa5a55'
        },
        {
            name: '进行中',
            icon: 'clock-circle-moment',
            color: '#ef7bde'
        },
        {
            name: '已完成',
            icon: 'wtf-completed',
            color: '#22d7bb'
        }
    ];

    color: string;

    color1: string;

    constructor() {
        this.color = '#7076fa';
        this.color1 = '#f969aa';
    }
}
