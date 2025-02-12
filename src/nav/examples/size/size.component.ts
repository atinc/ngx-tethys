import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-nav-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    standalone: false
})
export class ThyNavSizeExampleComponent implements OnInit {
    sizes = [
        {
            value: 'sm',
            text: 'sm'
        },
        {
            value: 'md',
            text: 'md'
        },
        {
            value: 'lg',
            text: 'lg'
        }
    ];

    size = this.sizes[1];

    constructor() {}

    ngOnInit(): void {}
}
