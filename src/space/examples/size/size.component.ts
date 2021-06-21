import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-space-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    host: {}
})
export class ThySpaceSizeExampleComponent implements OnInit {
    sizes = ['sm', 'md', 'lg', 40];

    size = 'md';

    constructor() {}

    ngOnInit() {}
}
