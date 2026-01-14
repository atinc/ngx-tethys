import { Component, OnInit } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';

import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-tag-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    imports: [ThyTag, ThyButtonGroup, ThyIcon, ThyButton]
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
