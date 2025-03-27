import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-space-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    host: {},
    standalone: false
})
export class ThySpaceSizeExampleComponent implements OnInit {
    sizes = ['zero', 'xxs', 'xs', 'sm', 'md', 'lg', 'xlg', 40];

    size = 'md';

    constructor() {}

    ngOnInit() {}
}
