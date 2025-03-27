import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-space-align-example',
    templateUrl: './align.component.html',
    styleUrls: ['./align.component.scss'],
    host: {
        class: 'space-align-container'
    },
    standalone: false
})
export class ThySpaceAlignExampleComponent implements OnInit {
    sizes = ['sm', 'md', 'lg', 40];

    size = 'md';

    constructor() {}

    ngOnInit() {}
}
