import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-template',
    templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {
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
        },
        {
            value: 66,
            color: '#66c060'
        }
    ];

    constructor() {}

    ngOnInit() {}
}
