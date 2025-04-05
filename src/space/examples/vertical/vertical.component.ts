import { Component, OnInit } from '@angular/core';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-space-vertical-example',
    templateUrl: './vertical.component.html',
    styleUrls: ['./vertical.component.scss'],
    host: {},
    imports: [ThySpace, ThySpaceItemDirective, ThyButton]
})
export class ThySpaceVerticalExampleComponent implements OnInit {
    sizes = ['sm', 'md', 'lg', 40];

    size = 'md';

    constructor() {}

    ngOnInit() {}
}
