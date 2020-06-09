import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-button-group-example',
    templateUrl: './group.component.html'
})
export class ThyButtonGroupExampleComponent implements OnInit {
    btnSizes = [
        {
            name: 'xs',
            height: 24
        },
        {
            name: 'sm',
            height: 28
        },
        {
            name: 'md',
            height: 32
        },
        {
            name: 'default',
            height: 36
        },
        {
            name: 'lg',
            height: 44
        }
    ];

    currentSize = this.btnSizes[3];

    constructor() {}

    ngOnInit() {}
}
