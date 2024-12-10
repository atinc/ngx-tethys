import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-tabs-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    standalone: false
})
export class ThyTabsSizeExampleComponent implements OnInit {
    sizes = [
        {
            value: 'sm',
            height: 44
        },
        {
            value: 'md',
            height: 48
        },
        {
            value: 'lg',
            height: 52
        }
    ];

    size = this.sizes[0].value;

    constructor() {}

    ngOnInit(): void {}
}
