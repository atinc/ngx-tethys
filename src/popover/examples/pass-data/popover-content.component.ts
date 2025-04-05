import { Component, OnInit } from '@angular/core';
import { ThyPopoverHeader, ThyPopoverBody, ThyPopoverDirective } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-pass-data-content',
    template: `
        <thy-popover-header [thyTitle]="title"></thy-popover-header>
        <thy-popover-body>
            {{ content }}
        </thy-popover-body>
    `,
    imports: [ThyPopoverHeader, ThyPopoverBody, ThyPopoverDirective]
})
export class ThyPopoverPassDataContentComponent implements OnInit {
    title: string;
    content: string;

    constructor() {}

    ngOnInit() {}
}
