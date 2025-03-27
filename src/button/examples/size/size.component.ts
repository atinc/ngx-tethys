import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-button-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThyButtonSizeExampleComponent implements OnInit {
    sizes = [
        {
            value: 'xs',
            height: 24
        },
        {
            value: 'sm',
            height: 28
        },
        {
            value: 'md',
            height: 32
        },
        {
            value: 'default',
            height: 36
        },
        {
            value: 'lg',
            height: 44
        }
    ];

    size = this.sizes[3].value;

    constructor() {}

    ngOnInit() {}
}
