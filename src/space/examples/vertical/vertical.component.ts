import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-space-vertical-example',
    templateUrl: './vertical.component.html',
    styleUrls: ['./vertical.component.scss'],
    host: {},
    standalone: false
})
export class ThySpaceVerticalExampleComponent implements OnInit {
    sizes = ['sm', 'md', 'lg', 40];

    size = 'md';

    constructor() {}

    ngOnInit() {}
}
