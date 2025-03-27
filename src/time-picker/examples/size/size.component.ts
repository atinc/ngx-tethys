import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-time-picker-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThyTimePickerSizeExampleComponent implements OnInit {
    date: Date;

    sizes = [
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

    size: string = 'default';

    constructor() {}

    ngOnInit() {}
}
