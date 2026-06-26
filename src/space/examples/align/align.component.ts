import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-space-align-example',
    templateUrl: './align.component.html',
    styleUrls: ['./align.component.scss'],
    host: {
        class: 'space-align-container'
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySpace, ThySpaceItemDirective, ThyButton]
})
export class ThySpaceAlignExampleComponent implements OnInit {
    sizes = ['sm', 'md', 'lg', 40];

    size = 'md';

    constructor() {}

    ngOnInit() {}
}
