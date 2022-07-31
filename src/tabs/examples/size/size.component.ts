import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-tabs-size-example',
    templateUrl: './size.component.html'
})
export class ThyTabsSizeExampleComponent implements OnInit {
    sizes = [
        {
            value: 'sm',
            height: 48
        },
        {
            value: 'md',
            height: 52
        },
        {
            value: 'lg',
            height: 56
        }
    ];

    size = this.sizes[0].value;

    constructor() {}

    ngOnInit(): void {}
}
