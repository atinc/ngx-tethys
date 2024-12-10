import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-progress-tips',
    templateUrl: './tips.component.html',
    standalone: false
})
export class ThyProgressTipsExampleComponent implements OnInit {
    stacked = [
        {
            value: 62,
            color: '#fa5a55'
        },
        {
            value: 35,
            color: '#39ba5d'
        },
        {
            value: 92,
            color: '#4e8af9'
        },
        {
            value: 72,
            color: '#2cccda'
        }
    ];

    constructor() {}

    ngOnInit() {}
}
