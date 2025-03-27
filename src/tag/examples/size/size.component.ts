import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-tag-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    standalone: false
})
export class ThyTagSizeExampleComponent implements OnInit {
    sizes = [
        {
            value: 'sm',
            height: 20
        },
        {
            value: 'md',
            height: 24
        },
        {
            value: 'lg',
            height: 28
        }
    ];

    size = 'md';

    constructor() {}

    ngOnInit(): void {}
}
